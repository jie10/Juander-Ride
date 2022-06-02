/** LOCAL STORAGE */
var USER_LOGIN_DATA_KEY = 'user_login_data';
var CURRENT_APP_VERSION_KEY = 'current_app_version';

/** CONSTANT VALUES */
var DELAY_TIME_IN_MILLISECONDS = 1000;

var my_trips_button = document.getElementById('my_trips_button');
var my_bookings_button = document.getElementById('my_bookings_button');
var logout_button = document.getElementById('logout_button');
var back_to_previous_page_button = document.getElementById('back_to_previous_page_button');
var profile_navbar = document.getElementById('profile_navbar');
var secondary_top_navbar = document.getElementById('secondary_top_navbar');
var main_bottom_navbar = document.getElementById('main_bottom_navbar');
var account_page_body_container = document.getElementById('account_page_body_container');
var my_trips_container = document.getElementById('my_trips_container');
var my_bookings_container = document.getElementById('my_bookings_container');
var activity_indicator = document.getElementById('activity_indicator');

var RIDER_BOOKING_HISTORY_API_ENDPONT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book/rider';
var GET_TRIP_BY_ID_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip';
var UPDATE_TRIP_BY_ID_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip';
var DRIVER_BOOKINGS_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book/driver';
var CONFIRM_OR_CANCEL_BOOKING_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book';
var PAGE_LOAD_SPINNER = "<div class=\"absolute-center page-loader\">" +
                            "<div class=\"spinner-border\" style=\"width: 3rem; height: 3rem;\" role=\"status\">" +
                                "<span class=\"visually-hidden\">Loading...</span>" +
                            "</div>" +
                        "</div>";
var NO_RESULTS_FOUND = "<p class=\"text-muted absolute-center text-center\">No results found.</p>";

function capitalize(word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
}
function delay(callback, TIMEOUT_IN_SECONDS) {
    setTimeout(callback, TIMEOUT_IN_SECONDS);
}
function sortDateTime(arr, order) {
    if (order === 'desc') {
        return arr.sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else {
        return arr.sort((a,b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    }
}

function getStatusIndicator(status) {
    switch(status) {
        case 0:
            return {
                trip_status: 'pending',
                withButtons: true,
                color: 'bg-warning',
                origin: 'Coming from ',
                destination: 'Going to ',
                target_location: 'Target location is ',
                action: 'On trip with '
            }
        case 1:
            return {
                trip_status: 'confirmed',
                withButtons: false,
                color: 'bg-primary',
                origin: 'Coming from ',
                destination: 'Going to ',
                target_location: 'Target location is ',
                action: 'On trip with '
            }
        case 2:
            return {
                trip_status: 'cancelled',
                withButtons: false,
                color: 'bg-secondary',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        case 3:
            return {
                trip_status: 'completed',
                withButtons: false,
                color: 'bg-success',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        default: return null;
    }
}
function moveToLoginpage() {
    window.location.href = '../index.html';
}
function checkCurrentSession() {
    var user_login_data = localStorage.getItem(USER_LOGIN_DATA_KEY);

    if (user_login_data) {
        document.querySelector('.account-page-container').style.display = 'block';
        loadUserDetails();
        reloadCurrentPage();
    } else {
        moveToLoginPage();
    }
}
function logoutCurrentSession() {
    delay(function () {
        localStorage.removeItem(USER_LOGIN_DATA_KEY);
        localStorage.removeItem(CURRENT_APP_VERSION_KEY);
        moveToLoginpage();
    }, DELAY_TIME_IN_MILLISECONDS);
}

function showProfileNavbar() {
    profile_navbar.style.display = 'flex';
    secondary_top_navbar.style.display = 'none';
}
function showSecondaryTopNavbar() {
    profile_navbar.style.display = 'none';
    secondary_top_navbar.style.display = 'flex';
}
function showMainBottomNavbar() {
    main_bottom_navbar.style.display = 'block';
}
function showMainAccountPageContainer() {
    account_page_body_container.style.display = 'block';
    my_trips_container.style.display = 'none';
    my_bookings_container.style.display = 'none';
}
function showMyTripsPageContainer() {
    account_page_body_container.style.display = 'none';
    my_trips_container.style.display = 'block';
}
function showMyBookingsPageContainer() {
    account_page_body_container.style.display = 'none';
    my_bookings_container.style.display = 'block';
}

/** TEMPORARY FILE */
function showActivityIndicator() {
    activity_indicator.style.visibility = "visible";
}
function hideActivityIndicator() {
    activity_indicator.style.visibility = "collapse";
}

function hideMainBottomNavbar() {
    main_bottom_navbar.style.display = 'none';
}

function reloadCurrentPage() {
    showProfileNavbar();
    showMainBottomNavbar();
    showMainAccountPageContainer();
    showActivityIndicator();

    delay(function () {
        hideActivityIndicator();
    }, DELAY_TIME_IN_MILLISECONDS);
}

function loadBookingButtons(status, _id, tripID) {
    switch(status) {
        case 0:
            return '<div class="d-grid gap-2 d-sm-flex justify-content-sm-end mt-4">'
                        + '<button type="button" onclick=\"onCancelBooking(this)\" class=\"btn btn-secondary order-1 \" id=\"' + _id + '_' + tripID + '_cancel\">Cancel</button>'
                        + '<button type="button" onclick=\"onConfirmBooking(this)\" class=\"btn btn-primary order-sm-1\" id=\"' + _id + '_' + tripID + '_confirm\">Confirm</button>'
                    + '</div>';
        default: return '';
    }
}
function loadUserDetails() {
    var user_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

    document.querySelector('.user-name').innerHTML = user_data.displayName ? user_data.displayName : user_data.email;
    document.querySelector('.user-role').innerHTML = user_data.jobTitle ? user_data.jobTitle : 'CEB employee';
    document.querySelector('.user-position').innerHTML = user_data.jobTitle ? user_data.jobTitle : 'Cebu Pacifir Air, Inc.';
    document.querySelector('.points-count').innerHTML = user_data.points ? user_data.points : 0;
    document.querySelector('.badges-count').innerHTML = user_data.badges ? user_data.badges : 0;
    document.querySelector('.items-count').innerHTML = user_data.items ? user_data : 0;
}
function getRiderBookingsHistory() {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };
    
    fetch(RIDER_BOOKING_HISTORY_API_ENDPONT + '/' + email.toLowerCase(), options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            hideActivityIndicator();

            if (data && data.length > 0) {
                sortDateTime(data, 'desc');
                my_trips_container.innerHTML = '<div class=\"tripHistory-list container\">' +
                                                    data.sort((a,b) => b.updatedAt - a.updatedAt).map(function (val) { 
                                                        var timeFromNowFormat = moment(val.updatedAt).utc().format('MMMM D, YYYY  h:mm a');
                                                        var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
                                                        var _id = val._id;
                                                        var drivernameArr = val.drivername.split(' ');
                                                        var destination = val.destination;
                                                        var bookingStatus = getStatusIndicator(val.status);
                                                        var bookingName = (val.booktype === 0 ? capitalize(drivernameArr[drivernameArr.length - 1]) : capitalize(destination.split(' ')[0])) + ' Ride';

                                                        return '<div class=\"list-item\" id=\"' + _id + '\">'
                                                                    + '<div class=\"row d-flex align-items-center header\">'
                                                                        + '<div class=\"col heading\">' + bookingName + '</div>'
                                                                        + '<div class=\"col-2 status ' + bookingStatus.color + '\">' + bookingStatus.trip_status + '</div>'
                                                                    + '</div>'
                                                                    + '<div>'
                                                                        + '<p class=\"datetime\">'  + capitalize(timeFromNow) + ' ' + timeFromNowFormat + '</p>'
                                                                    + '</div>'
                                                                    + '<p class=\"destination\">' + destination + '</p>'
                                                                    + '<p class=\"seat-number\">' + '1/3 Seats' + '</p>'
                                                                + '</div>';
                                                    }).join('');
                                                + '</div>';
            } else {
                my_trips_container.innerHTML = NO_RESULTS_FOUND;
            }
        })
        .catch(function (err) {
            console.error(err);
            alert('ERROR: ' + err);
            reloadCurrentPage();
        });
}
function getDriverBookings() {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(DRIVER_BOOKINGS_API_ENDPOINT + '/' + email.toLowerCase(), options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            hideActivityIndicator();

            if (data && data.length > 0) {
                sortDateTime(data, 'desc');
                my_bookings_container.innerHTML = '<div class=\"tripHistory-list container\">' +
                                                    data.map(function (val) { 
                                                        var timeFromNowFormat = moment(val.updatedAt).utc().format('MMMM D YYYY  h:mm a');
                                                        var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
                                                        var _id = val._id;
                                                        var drivernameArr = val.drivername.split(' ');
                                                        var destination = val.destination;
                                                        var bookingStatus = getStatusIndicator(val.status);
                                                        var bookingName = (val.booktype === 0 ? capitalize(drivernameArr[drivernameArr.length - 1]) : capitalize(destination.split(' ')[0])) + ' Ride';

                                                        return '<div class=\"list-item\" id=\"' + _id + '\" style=\"' + (bookingStatus.withButtons ? 'cursor: pointer;' : 'cursor: default;') +'\">'
                                                                    + '<div class=\"row d-flex align-items-center header\">'
                                                                        + '<div class=\"col heading\">' + bookingName + '</div>'
                                                                        + '<div class=\"col-2 status ' + bookingStatus.color + '\">' + bookingStatus.trip_status + '</div>'
                                                                    + '</div>'
                                                                    + '<div>'
                                                                        + '<p class=\"datetime\">'  + capitalize(timeFromNow) + ' ' + timeFromNowFormat + '</p>'
                                                                    + '</div>'
                                                                    + '<p class=\"destination\">' + destination + '</p>'
                                                                    + '<p class=\"seat-number\">' + '1/3 Seats' + '</p>'
                                                                + '</div>';
                                                    }).join('');
                                                + '</div>';
            } else {
                my_bookings_container.innerHTML = NO_RESULTS_FOUND;
            }
        })
        .catch(function (err) {
            hideActivityIndicator();
            console.error(err);
            alert('ERROR: ' + err);
            reloadCurrentPage();
        });
}

function confirmOrCancelBooking(_id, status, tripID) {
    var email = document.getElementById(_id + '_rider').innerHTML + '@cebupacificair.com';
    var payload = {
        "status": status
    };
    var options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(CONFIRM_OR_CANCEL_BOOKING_API_ENDPOINT + '/' + _id, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            fetch(GET_TRIP_BY_ID_API_ENDPOINT + '/' + tripID)
                .then(function (result) {
                    return result.json();
                })
                .then(function (data) {
                    hideActivityIndicator();

                    if (data) {
                        var riders = data.riders;
                        var temp = data.temp;
                        var seats = data.seats;
                        var newPayload = {
                            seats: seats + 1,
                            temp: temp.filter(function (rider) {
                                return rider !== email;
                            }),
                            riders: riders
                        };
        
                        if (status === 1) {
                            riders.push(email);
                            newPayload  = {
                                seats: seats,
                                temp: temp.filter(function (rider) {
                                    return rider !== email;
                                }),
                                riders: riders
                            } 
                        }
                        var newOptions = {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newPayload)
                        };

                        fetch(UPDATE_TRIP_BY_ID_API_ENDPOINT + '/' + tripID, newOptions)
                            .then(function (result) {
                                return result.json();
                            })
                            .then(function (data) {
                                console.log(data)
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: status === 1 ? 'Booking has been confirmed' : 'Booking has been cancelled',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    timerProgressBar: true
                                });
                    
                                reloadCurrentPage();
                            })
                            .catch(function (err) {
                                console.error(err);
                                alert('ERROR: ' + err);
                                reloadCurrentPage();
                            });
                    }
                })
                .catch(function (err) {
                    console.error(err);
                    alert('ERROR: ' + err);
                    reloadCurrentPage();
                });
        })
        .catch(function (err) {
            console.error(err);
            alert('ERROR: ' + err);
            reloadCurrentPage();
        });
}

function onConfirmBooking(e) {
    var _id = e.id.split('_')[0];
    var tripID = e.id.split('_')[1];

    Swal.fire({
        title: 'Confirm Booking',
        text: 'Are you sure you want to continue?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            confirmOrCancelBooking(_id, 1, tripID);
        }
    });
}
function onCancelBooking(e) {
    var _id = e.id.split('_')[0];
    var tripID = e.id.split('_')[1];

    Swal.fire({
        title: 'Cancel Booking',
        text: 'Are you sure you want to continue?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            confirmOrCancelBooking(_id, 2, tripID);
        }
    });
}
function onMyTrips() {
    showSecondaryTopNavbar();
    hideMainBottomNavbar();
    showMyTripsPageContainer();
    showActivityIndicator();
    getRiderBookingsHistory();
}
function onMyBookings() {
    showSecondaryTopNavbar();
    hideMainBottomNavbar();
    showMyBookingsPageContainer();
    showActivityIndicator();
    getDriverBookings();
}
function onLogout() {
    Swal.fire({
        icon: 'question',
        title: 'Log out',
        text: 'Are you sure you want to continue?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            showActivityIndicator();
            logoutCurrentSession();
        }
    });
}

back_to_previous_page_button.addEventListener('click', reloadCurrentPage);
my_trips_button.addEventListener('click', onMyTrips);
my_bookings_button.addEventListener('click', onMyBookings);
logout_button.addEventListener('click', onLogout);

document.addEventListener('DOMContentLoaded', function () {
    checkCurrentSession();
});