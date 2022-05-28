var my_trips_button = document.getElementById('my_trips_button');
var my_bookings_button = document.getElementById('my_bookings_button');
var settings_button = document.getElementById('settings_button');
var logout_button = document.getElementById('logout_button');
var back_to_previous_page_button = document.getElementById('back_to_previous_page_button');
var profile_navbar = document.getElementById('profile_navbar');
var secondary_top_navbar = document.getElementById('secondary_top_navbar');
var main_bottom_navbar = document.getElementById('main_bottom_navbar');
var account_page_body_container = document.getElementById('account_page_body_container');
var my_trips_container = document.getElementById('my_trips_container');
var my_bookings_container = document.getElementById('my_bookings_container');

var USER_LOGIN_DATA_KEY = 'user_login_data';
var RIDER_BOOKING_HISTORY_API_ENDPONT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book/rider';
var DRIVER_BOOKINGS_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book/driver';
var PAGE_LOAD_SPINNER = "<div class=\"absolute-center page-loader\">" +
                            "<div class=\"spinner-border\" style=\"width: 3rem; height: 3rem;\" role=\"status\">" +
                                "<span class=\"visually-hidden\">Loading...</span>" +
                            "</div>" +
                        "</div>";
var NO_RESULTS_FOUND = "<p class=\"text-muted absolute-center text-center\">No results found.</p>";

function delay(callback, TIMEOUT_IN_SECONDS) {
    setTimeout(callback, TIMEOUT_IN_SECONDS);
}

function moveToLoginpage() {
    window.location.href = '../index.html';
}
function checkCurrentSession() {
    var user_login_data = localStorage.getItem(USER_LOGIN_DATA_KEY);

    if (user_login_data) {
        document.querySelector('.account-page-container').style.display = 'block';
        loadUserDetails();
    } else {
        moveToLoginpage();
    }
}
function logoutCurrentSession() {
    localStorage.removeItem(USER_LOGIN_DATA_KEY);
    moveToLoginpage();
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

function hideMainBottomNavbar() {
    main_bottom_navbar.style.display = 'none';
}

function reloadAccountMainPage() {
    showProfileNavbar();
    showMainBottomNavbar();
    showMainAccountPageContainer();
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
function loadRiderBookingsHistory() {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };
    
    fetch(RIDER_BOOKING_HISTORY_API_ENDPONT + '/' + email, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            if (data && data.length > 0) {
                my_trips_container.innerHTML = '<div class=\"tripHistory-list container\">' +
                                                    data.map(function (val) { 
                                                        var timeFromNowFormat = moment(val.updatedAt).utc().format('MMMM D YYYY  h:mm a');
                                                        var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
                                                        var _id = val._id;
                                                        var driver = val.drivername;
                                                        var destination = val.destination;
                                                        var bookingStatus = val.status === 0 ? 'On Trip' : 'Trip Completed';
                                                        var bookingStatusByColor = val.status === 0 ? 'text-info' : 'text-success';
                                                        var bookingStatusByDestination = val.status === 0 ? 'Going to ' : 'Went to ';
                                                        var bookingStatusByDriverAction = val.status === 0 ? 'On trip with ' : 'Shared ride with ';
                                                        var bookingType = val.booktype === 0 ? 'Carpool' : 'Shuttle';

                                                        return '<div class=\"list-item\" id=\"' + _id + '\">'
                                                                    + '<p class=\"time\">' + timeFromNowFormat + '</p>'
                                                                    + '<p class=\"date\">' + timeFromNow + '</p>'
                                                                    + '<p class=\"whereTo\">' + '<span class=\"highlight\">' + bookingType + ' ' + bookingStatus + '</span>' + '</p>'
                                                                    + '<p class=\"whereTo\"><span class=\"material-icons-round ' + bookingStatusByColor + '\">circle</span>' + bookingStatusByDestination + destination + '</p>'
                                                                    + '<p class=\"whereTo\"><span class=\"material-icons-round ' + bookingStatusByColor + '\">circle</span>' + bookingStatusByDriverAction + driver + '</p>'
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
            reloadAccountMainPage();
        });
}
function loadDriverBookings() {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(DRIVER_BOOKINGS_API_ENDPOINT + '/' + email, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            if (data && data.length > 0) {
                my_bookings_container.innerHTML = '<div class=\"tripHistory-list container\">' +
                                                    data.map(function (val) { 
                                                        var timeFromNowFormat = moment(val.updatedAt).utc().format('MMMM D YYYY  h:mm a');
                                                        var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
                                                        var _id = val._id;
                                                        var ridername = val.ridername;
                                                        var destination = val.destination;
                                                        var bookingStatus = val.status === 0 ? 'On Trip' : 'Trip Completed';
                                                        var bookingStatusByColor = val.status === 0 ? 'text-info' : 'text-success';
                                                        var bookingStatusByDestination = val.status === 0 ? 'Going to ' : 'Went to ';
                                                        var bookingStatusByDriverAction = val.status === 0 ? 'On trip with ' : 'Shared ride with ';
                                                        var bookingType = val.booktype === 0 ? 'Carpool' : 'Shuttle';

                                                        return '<div class=\"list-item\" id=\"' + _id + '\">'
                                                                    + '<p class=\"time\">' + timeFromNowFormat + '</p>'
                                                                    + '<p class=\"date\">' + timeFromNow + '</p>'
                                                                    + '<p class=\"whereTo\">' + '<span class=\"highlight\">' + bookingType + ' ' + bookingStatus + '</span>' + '</p>'
                                                                    + '<p class=\"whereTo\"><span class=\"material-icons-round ' + bookingStatusByColor + '\">circle</span>' + bookingStatusByDestination + destination + '</p>'
                                                                    + '<p class=\"whereTo\"><span class=\"material-icons-round ' + bookingStatusByColor + '\">circle</span>' + bookingStatusByDriverAction + ridername + '</p>'
                                                                + '</div>';
                                                    }).join('');
                                                + '</div>';
            } else {
                my_bookings_container.innerHTML = NO_RESULTS_FOUND;
            }
        })
        .catch(function (err) {
            console.error(err);
            alert('ERROR: ' + err);
            reloadAccountMainPage();
        });
}

function onMyTrips() {
    showSecondaryTopNavbar();
    hideMainBottomNavbar();
    showMyTripsPageContainer();
    my_trips_container.innerHTML = PAGE_LOAD_SPINNER;
    delay(loadRiderBookingsHistory, 1500);
}
function onMyBookings() {
    showSecondaryTopNavbar();
    hideMainBottomNavbar();
    showMyBookingsPageContainer();
    my_bookings_container.innerHTML = PAGE_LOAD_SPINNER;
    delay(loadDriverBookings, 1500);
}
function onSettings() {
    // TODO - move to settings component or page
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
            logoutCurrentSession();
        }
    });
}

back_to_previous_page_button.addEventListener('click', reloadAccountMainPage);
my_trips_button.addEventListener('click', onMyTrips);
my_bookings_button.addEventListener('click', onMyBookings);
settings_button.addEventListener('click', onSettings);
logout_button.addEventListener('click', onLogout);

document.addEventListener('DOMContentLoaded', function () {
    checkCurrentSession();
});