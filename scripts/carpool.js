/** LOCAL STORAGE */
var USER_LOGIN_DATA_KEY = 'user_login_data';
var CURRENT_BOOKED_TRIP_KEY = 'current_booked_trip';
var DRIVER_TRIP_STATUS_KEY = 'driver_trip_status';
var DRIVER_TRIP = 'driver_trip';
var DRIVER_BOOKING = 'user_booking';

/** CONSTANT VALUES */
var DELAY_TIME_IN_MILLISECONDS = 1000;
var MS_TEAMS_SEND_MESSAGE_TO_USER_LINK_URL = 'https://teams.microsoft.com/l/chat/0/0?users=';
var PHONE_CALL_TO_USER_LINK_URL = 'tel:+';

/** API ENDPOINTS */
var UPDATE_TRIP_STATUS_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip/status';
var VIEW_RIDER_BOOKINGS_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book/rider';
var VIEW_DRIVER_TRIPS_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip/driver';
var VIEW_DRIVER_TRIPS_BY_ID_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip';
var COMPLETE_TRIP_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip';
var MATCH_TRIP_DYNAMIC_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/match/trip';
var BOOK_RIDE_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book';
var CREATE_TRIP_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip';
var CONFIRM_OR_CANCEL_BOOKING_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book';

/** SOURCE LOCATION */
var HOMEPAGE_SOURCE_LOCATION = '/';
var ACCOUNTPAGE_SOURCE_LOCATION = '../pages/account.html';

/** COMPONENTS */
var NO_RESULTS_FOUND = "<p class=\"text-muted absolute-center text-center\" style=\"font-weight: 700; font-size: 1rem;\">No results found</p>";

/** DOM ELEMENTS */
var carpool_ride_list_container = document.getElementById('carpool_ride_list_container');
var share_a_ride_container = document.getElementById('share_a_ride_container');
var carpool_main_page = document.getElementById('carpool_main_page');
var carpool_on_booking_container = document.getElementById('carpool_on_booking_container');

var carpool_ride_list_button = document.getElementById('carpool_ride_list_button');
var share_a_ride_button = document.getElementById('share_a_ride_button');
var back_to_previous_page_button = document.getElementById('back_to_previous_page_button');


/** CARPOOL MAIN PAGE */
function getResJSON(result) {
    return result.json();
}
function getStatusIndicator(status) {
    switch(status) {
        case 0:
            return {
                trip_status: 'pending',
                withButtons: true,
                statusColor: '#706209',
                color: '#FFE014',
                bgColor: '#FFE014',
                origin: 'Coming from ',
                destination: 'Going to ',
                target_location: 'Target location is ',
                action: 'On trip with '
            }
        case 1:
            return {
                trip_status: 'confirmed',
                withButtons: false,
                statusColor: '#075A70',
                color: '#10CCFF',
                bgColor: '#10CCFF',
                origin: 'Coming from ',
                destination: 'Going to ',
                target_location: 'Target location is ',
                action: 'On trip with '
            }
        case 2:
            return {
                trip_status: 'cancelled',
                withButtons: false,
                statusColor: '#626262',
                color: '#E0E0E0',
                bgColor: '#E0E0E0',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        case 3:
            return {
                trip_status: 'completed',
                withButtons: false,
                statusColor: '#075A70',
                color: '#10CCFF',
                bgColor: '#10CCFF',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        default: return null;
    }
}
function getStatusPopup(bookingID, status, driverEmail) {
    console.log(status)
    switch(status) {
        case 0:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                var payload = {
                    "status": 2
                };
                var options = {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                };

                showActivityIndicator();

                fetch(CONFIRM_OR_CANCEL_BOOKING_API_ENDPOINT + '/' + bookingID, options)
                    .then(getResJSON)
                    .then(function (data) {
                        delay(function () {
                            window.location.href = HOMEPAGE_SOURCE_LOCATION;
                        }, DELAY_TIME_IN_MILLISECONDS);
                    })
                    .catch(function (err) {
                        console.error(err);
                        hideActivityIndicator();
                        showErrorAlertWithConfirmButton(function () {
                            window.location.href = HOMEPAGE_SOURCE_LOCATION;
                        }, 'Error 500', 'Internal server error', 'Refresh');
                    });
            }, 'Booking Pending', 'Waiting for driver to confirm', 'Cancel Booking');
            break;
        case 1:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                window.open(MS_TEAMS_SEND_MESSAGE_TO_USER_LINK_URL + driverEmail);
            }, 'Booking confirmed', 'Driver has confirmed your booking request', 'Message Driver');
            break;
        case 2:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                localStorage.removeItem(DRIVER_BOOKING);
                localStorage.removeItem(CURRENT_BOOKED_TRIP_KEY);
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Booking cancelled', 'Driver has cancelled your booking request', 'Done');
            break;
        case 3:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                localStorage.removeItem(DRIVER_BOOKING);
                localStorage.removeItem(CURRENT_BOOKED_TRIP_KEY);
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Booking finished', 'Hope you had a great car pooling experience', 'Done');
            break;
        default: break;
    }
}
function getRiderTripStatusAPI(tripID) {
    var VIEW_DRIVER_TRIPS_BY_ID_URL = VIEW_DRIVER_TRIPS_BY_ID_API_ENDPOINT + '/' + tripID;

    fetch(VIEW_DRIVER_TRIPS_BY_ID_URL)
        .then(getResJSON)
        .then(function (driver) {
            if (driver) {
                hideActivityIndicator();
                hideMoreCarpoolButtonsContainer();
                carpool_main_page.style.display = 'block';
                carpool_on_trip_container.style.display = 'none';
                find_carpool_navigate_container.style.display = 'none';

                if (driver.status === 0 || driver.status === 1) {                    
                    carpool_on_trip_container.style.display = 'block';

                    document.querySelector('.on_trip_rider_message').innerHTML = driver.status === 0 ? 'Waiting to start trip' : driver.status === 1 ? 'We\'re on our way' : '';
                    document.querySelector('.on_trip_rider_fullname').innerHTML = driver.fullname;
                    document.querySelector('.on_trip_rider_location').innerHTML = driver.origin;
                    document.querySelector('.on_trip_rider_teams_email a').href = MS_TEAMS_SEND_MESSAGE_TO_USER_LINK_URL + driver.email;
                    document.querySelector('.on_trip_phone_number a').href = PHONE_CALL_TO_USER_LINK_URL + driver.phone;
                } else if (driver.status === 3) {
                    loadTripCancelledScreen();
                } else {
                    loadTripCompletedScreen();
                }
            } else {
                localStorage.removeItem(CURRENT_BOOKED_TRIP_KEY);
                hideActivityIndicator();
                showErrorAlertWithConfirmButton(function () {
                    window.location.href = HOMEPAGE_SOURCE_LOCATION;
                }, 'Error 404', 'No Data Found', 'Refresh');
            }
        })
        .catch(function (err) {
            console.error(err);
	        hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function getRiderBookingsStatusAPI(tripID) {
    var userEmail = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email.toLowerCase();
    var userBooking = JSON.parse(localStorage.getItem(DRIVER_BOOKING));
    var VIEW_RIDER_BOOKINGS_URL = VIEW_RIDER_BOOKINGS_API_ENDPOINT + '/' + userEmail;

    fetch(VIEW_RIDER_BOOKINGS_URL)
        .then(getResJSON)
        .then(function (data) {
            if (data && data.length > 0) {   
                var currentBooking = data.filter(function(booking) {
                    return booking.tripID === tripID;
                })[0];
                console.log()
                var timeFromNowFormat = moment(userBooking.departTime).utc().format('MMMM D YYYY  h:mm a');
                var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
                var drivernameArr = userBooking.drivername.split(' ');
                var destination = userBooking.destination;
                var bookingStatus = getStatusIndicator(currentBooking.status);
                var bookingName = (currentBooking.booktype === 0 ? capitalize(drivernameArr[drivernameArr.length - 1]) : capitalize(destination.split(' ')[0])) + ' Ride';

                hideActivityIndicator();
                carpool_main_page.style.display = 'block';
                find_carpool_navigate_container.style.display = 'none';
                carpool_on_booking_container.style.display = 'block';
                console.log(currentBooking)

                document.querySelector('.current-booking-item').style.backgroundColor = bookingStatus.bgColor;
                document.querySelector('.current-booking-item .heading').innerHTML = bookingName;
                document.querySelector('.current-booking-item .status').style.backgroundColor = bookingStatus.statusColor;
                document.querySelector('.current-booking-item .status').style.color = bookingStatus.color;
                document.querySelector('.current-booking-item .status').innerHTML = bookingStatus.trip_status;
                document.querySelector('.current-booking-item .datetime').innerHTML = capitalize(timeFromNow) + ' ' + timeFromNowFormat;
                document.querySelector('.current-booking-item .destination').innerHTML = currentBooking.destination;
                document.querySelector('.current-booking-item .seat-number').innerHTML = userBooking.seats + ' / ' + userBooking.seatCount + ' seats';

                document.querySelector('.current-booking-item').addEventListener('click', function () {
                    getStatusPopup(userBooking.bookingID, currentBooking.status, userBooking.driver);
                });
            } else {
                localStorage.removeItem(CURRENT_BOOKED_TRIP_KEY);
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function getDriverTripSessionAPI() {
    var userEmail = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email.toLowerCase();
    var VIEW_DRIVER_TRIPS_URL = VIEW_DRIVER_TRIPS_API_ENDPOINT + '/' + userEmail;
    var emptySeatBlock = '<div class=\"col-4 col-md-3\">'
                                + '<div class=\"avatar-container\">'
                                +     '<img class=\"avata\" src=\"../images/sample/no-avatar.png\" />'
                                + '</div>'
                                + '<p class=\"text-muted avatar-name avatar-name-unavailable\">Empty Seat</p>'
                            + '</div>';

    fetch(VIEW_DRIVER_TRIPS_URL)
        .then(getResJSON)
        .then(function (data) {
            hideActivityIndicator();
            carpool_main_page.style.display = 'block';

            if (data && data.length > 0) {
                var currentTrip = data.filter(function (currentTrip) {
                    return (currentTrip.status === 0 || currentTrip.status === 1) && currentTrip.tripType === 0
                });
                var ongoingDriverSession = currentTrip && currentTrip.length > 0 ? true : false;

                if (ongoingDriverSession) {
                    var driver = data.filter(function(trip) {
                        return trip._id === currentTrip[0]._id;
                    });

                    carpool_ride_list_container.style.display = 'none';
                    hideMoreCarpoolButtonsContainer();
                    showOnTripDriverContainer();

                    document.querySelector('.on-trip-driver-body').style.display = 'none';
                    document.getElementById('cancel_driver_trip_button').disabled = true;
                    document.getElementById('start_driver_trip_button').disabled = true;
                    document.getElementById('complete_driver_trip_button').disabled = true;

                    if (driver.length > 0) {
                        if(localStorage.getItem(DRIVER_TRIP_STATUS_KEY)) {
                            document.querySelector('.on-trip-driver-body').style.display = 'block';
                            document.getElementById('refresh_driver_page_button').style.display = 'none';
                            document.getElementById('cancel_driver_trip_button').disabled = false;
                            document.getElementById('cancel_driver_trip_button').style.display = 'block';
                            document.getElementById('start_driver_trip_button').style.display = 'none';
                            document.getElementById('complete_driver_trip_button').style.display = 'block';
                            document.getElementById('complete_driver_trip_button').disabled = false;
                            document.querySelector('.offcanvas_driver_trip_status').innerHTML = 'Trip ongoing';
                
                            hideActivityIndicator();
                        } else {
                            document.getElementById('start_driver_trip_button').disabled = false;
                            document.getElementById('cancel_driver_trip_button').disabled = false;
                            document.querySelector('.offcanvas_driver_trip_status').innerHTML = driver[0].seats == 0 ? 'Waiting for driver to start ride' : 'Waiting for passengers to join';
                        }

                        if (driver[0].temp.length > 0) {
                            showSuccessToastNotification('You got ' + driver[0].temp.length + ' pending booking request!');
                        } else {
                            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                                window.location.href = ACCOUNTPAGE_SOURCE_LOCATION;
                            }, 'Waiting for potential passengers', 'Please go to <b>My Bookings</b> to confirm or cancel booking requests', 'Go to Account Page');
                        }

                        document.getElementById('start_driver_trip_button').disabled = false;

                        document.querySelector('.offcanvas_driver_departure_time').innerHTML = moment(driver[0].departTime).utc().format('MMMM D YYYY  h:mm a');
                        document.querySelector('.offcanvas_driver_target_location').innerHTML = driver[0].origin + '<a style=\"margin-left: 8px; font-size: 0.75rem;\" target=\"_blank\" href=\"https://maps.google.com?q=' + driver[0].lat + ',' + driver[0].lng + '&z=15\">View in Map</a>';

                        document.querySelector('.on-trip-driver-body').style.display = 'block';

                        if (driver[0].riders.length > 0) {
                            var blocks = '';

                            for (var i = 0; i < driver[0].seats; i++) {
                                blocks += emptySeatBlock;
                            }

                            document.querySelector('.offcanvas_driver_seats_count').innerHTML = driver[0].seats + (driver[0].seats === 1 ? ' seat available' : ' seats available');
                            document.querySelector('.offcanvas_driver_passengers_list').innerHTML = driver[0].riders.map(function (passenger) {
                                return '<div class=\"col-4 col-md-3\">'
                                                + '<div class=\"avatar-container\">'
                                                +     '<img class=\"avata\" src=\"../images/sample/no-avatar.png\" />'
                                                + '</div>'
                                                + '<p class=\"text-muted avatar-name\">' + passenger.replace('@cebupacificair.com', '') + '</p>'
                                            + '</div>';
                                }).join('') + blocks;
                        } else {
                            var blocks = '';
                            var totalEmptySeats = driver[0].temp.length + driver[0].seats;

                            for (var i = 0; i < totalEmptySeats; i++) {
                                blocks += emptySeatBlock;
                            }

                            document.querySelector('.offcanvas_driver_passengers_list').innerHTML = blocks;
                            document.getElementById('start_driver_trip_button').disabled = true;
                            document.getElementById('cancel_driver_trip_button').disabled = false;
                            document.querySelector('.offcanvas_driver_seats_count').innerHTML = totalEmptySeats + ' seats available';
                        }

                        document.getElementById('start_driver_trip_button').addEventListener('click', onStartTrip(driver[0]._id, driver[0].riders));
                        document.getElementById('cancel_driver_trip_button').addEventListener('click', onCancelTrip(driver[0]._id, driver[0].riders));
                        document.getElementById('complete_driver_trip_button').addEventListener('click', onCompleteTrip(driver[0]._id, driver[0].riders));
                    } else {
                        document.querySelector('.on-trip-driver-body').style.display = 'block';
                        document.querySelector('.offcanvas_driver_seats_count').innerHTML = '-';
                        document.querySelector('.offcanvas_driver_departure_time').innerHTML = '-';
                        document.querySelector('.offcanvas_driver_target_location').innerHTML = '-';
                        document.querySelector('.offcanvas_driver_trip_status').innerHTML = 'Waiting for passengers to join';
                        document.getElementById('cancel_driver_trip_button').disabled = false;
                        document.getElementById('start_driver_trip_button').disabled = true;
                    }
                } else {
                    loadMainPage();
                }
            } else {
                loadMainPage();
            }
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function loadMainPage() {
    carpool_main_page.style.display = 'block';
    is_to_drop_switch.checked = false;
    is_to_drop_switch_rider.checked = false;

    onIsToDropSwitch();
    onIsToDropSwitchRider();
    showFindCarpoolNavigateContainer();
    showShareRideNavigateContainer();
    showMoreCarpoolButtonsContainer();
    showShareRideNavigateContainer();
    carpool_on_booking_container.style.display = 'none';
}
function reloadCurrentPage() {
    console.log("reloadCurrentPage");
    showActivityIndicator();

    delay(function () {
        var current_booked_trip_key = localStorage.getItem(CURRENT_BOOKED_TRIP_KEY);

        showMainBottomNavbar();
        showMainTopNavbar();

        if (current_booked_trip_key) {
            // Check if booking exists
            console.log(current_booked_trip_key)
            if (localStorage.hasOwnProperty(DRIVER_BOOKING)) {
                console.log("getRiderBookingsStatusAPI");
                
                var currentBooking = localStorage.getItem(DRIVER_BOOKING);
                currentBooking = JSON.parse(currentBooking);
                
                var current = new Date();
                var given = moment(currentBooking.departTime, "YYYY-MM-DDTHH:mm:ss.fZ");
                var duration = moment.duration(given.diff(current)).asHours();
                
                // add this in dev due to server time
                duration = duration - 8;

                if(duration <= 0.5){
                    // Cancel the trip for departure time expired
                    // IMPORTANT - Call cancel trip here
                    localStorage.removeItem(DRIVER_BOOKING);
                    hideActivityIndicator();
                    loadMainPage();
                }else{
                    console.log(duration);
                    getRiderBookingsStatusAPI(current_booked_trip_key);
                }
            }else{
                hideActivityIndicator();
                loadMainPage();
            }
        } else {
            // Check if trips exists
            if (localStorage.hasOwnProperty(DRIVER_TRIP)) {
                console.log("getDriverTripSessionAPI");
                
                // Check if trip is beyond departure time
                var currentTrip = localStorage.getItem(DRIVER_TRIP);
                currentTrip = JSON.parse(currentTrip);
                
                var current = new Date();
                var given = moment(currentTrip.departTime, "YYYY-MM-DDTHH:mm:ss.fZ");
                var duration = moment.duration(given.diff(current)).asHours();
                
                // add this in dev due to server time
                duration = duration - 8;
                
                if(duration <= 0.5){
                    // Cancel the trip for departure time expired
                    // IMPORTANT - Call cancel trip here
                    localStorage.removeItem(DRIVER_TRIP);
                    hideActivityIndicator();
                    loadMainPage();
                }else{
                    console.log(duration);
                    getDriverTripSessionAPI();
                }
            }else{
                hideActivityIndicator();
                loadMainPage();
            }
        }
    }, DELAY_TIME_IN_MILLISECONDS);
}
function moveToLoginPage() {
    // Clear local storage
    localStorage.clear();
    
    window.location.href = HOMEPAGE_SOURCE_LOCATION;
}
function onBackToPreviousPage() {
    reloadCurrentPage();
}

back_to_previous_page_button.addEventListener('click', onBackToPreviousPage);


/** FIND CARPOOL */
var find_carpool_navigate_container = document.getElementById('find_carpool_navigate_container');
var driver_pool_results_container = document.getElementById('driver_pool_results_container');
var carpool_on_trip_container = document.getElementById('carpool_on_trip_container');
var trip_completed_container = document.getElementById('trip_completed_container');
var trip_cancelled_container = document.getElementById('trip_cancelled_container');

var show_confirm_carpool_rider = document.getElementById('show_confirm_carpool_rider');
var search_pick_up_point = document.getElementById('search_pick_up_point');
var search_drop_off_point = document.getElementById('search_drop_off_point');
var is_to_drop_switch = document.getElementById('is_to_drop_switch');

var more_carpool_buttons = document.getElementById('more_carpool_buttons');
var find_pool_rider_button = document.getElementById('find_pool_rider_button');
var trip_completed_button = document.getElementById('trip_completed_button');
var join_pool_rider_button = document.getElementById('join_pool_rider_button');

function getCarpoolRideList() {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var pointA = is_to_drop_switch.checked ? search_drop_off_point.value : search_pick_up_point.value;
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pointA: pointA, tripType: 0 })
    };
    var emptySeatBlock = '<div class=\"col-4 col-md-3\">'
                                + '<div class=\"avatar-container\">'
                                +     '<img class=\"avata\" src=\"../images/sample/no-avatar.png\" />'
                                + '</div>'
                                + '<p class=\"text-muted avatar-name avatar-name-unavailable\">Empty Seat</p>'
                            + '</div>';

    fetch(MATCH_TRIP_DYNAMIC_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            hideActivityIndicator();
            showDriverPoolListContainer();

            if (data.length > 0) {
                driver_pool_results_container.innerHTML = '<div class=\"container\">' + '<div class=\"list-group\">' + data.filter(function (driver) {
                    return driver.email !== email;
                }).map(function (driver, i) {
                    var rider_fullname = driver.fullname ? driver.fullname : 'Unknown';
                    var is_pool_available = driver.seats > 0 ? 'Available' : 'Unavailable';
                    var is_pool_clickable = driver.seats > 0 ? 'data-bs-toggle="offcanvas" data-bs-target="#show_confirm_carpool_rider" aria-controls=\"show_confirm_carpool_rider\"' : '';
                    var is_pool_available_color = driver.seats > 0 ? 'bg-primary' : '.bg-secondary';
                    var rider_location = driver.origin.split(', ');
                    var location = rider_location[rider_location.length - 1];
                    var seat_total = driver.seats + driver.temp.length + driver.riders.length;
                    var seat_count = seat_total - driver.riders.length;

                    return '<button type=\"button\" class=\"list-group-item list-group-item-action carpool-driver-to-choose-button\" id=\"' + i + '\"' + is_pool_clickable + '>'
                                    + '<div class=\"row\">'
                                        + '<div class=\"col-4 col-sm-3 d-flex justify-content-center\" style=\"width: 75px; \">'
                                            + '<div class=\"avatar-container\">'
                                                + '<img class=\"avatar\" src=\"../images/sample/no-avatar.png\" />'
                                            + '</div>'
                                        + '</div>'
                                        + '<div class=\"col d-flex flex-column\">'
                                            + '<div class=\"row\">'
                                                + '<div class=\"col d-flex justify-content-between align-items-center\">'
                                                    + '<span class=\"h6 mb-0\">' + rider_fullname + '</span>'
                                                    + '<span class=\"badge rounded-pill ' + is_pool_available_color + ' mt-0\" style=\"margin-right: 5px;\">' + is_pool_available + ' </span>'
                                                + '</div>'
                                            + '</div>'
                                            + '<span class=\"text-muted\">' + location + '</span>'
                                            + '<span class=\"text-muted\" style="font-size: 0.75rem;">' + seat_count + ' out of ' + seat_total + ' seats left</span>'
                                        + '</div>'
                                    + '</div>'
                                + '</button>';
                }).join('') + '</div>' + '</div>';
        
                document.querySelectorAll('.carpool-driver-to-choose-button').forEach(function (btn) {
                    btn.addEventListener('click', function (e) {
                        var id = btn.id;
                        var rider_location = data[id].origin.split(', ');
                        var location = rider_location[rider_location.length - 1];
                        var pick_up_point = is_to_drop_switch.checked ? 'Cebu Pacific AOC' : data[id].origin;
                        var drop_off_point = is_to_drop_switch.checked ? data[id].origin : 'Cebu Pacific AOC';
                        var is_pool_available = data[id].seats > 0 ? 'Available' : 'Unavailable';
                        var rider_passengers = data[id].riders ? data[id].riders : null;
                        var rider_passengers_count = rider_passengers ? rider_passengers.length : 0;

                        var rider_phone_number = data[id].phone ? '+' + data[id].phone : '#';
                        var rider_teams_email = data[id].email ? data[id].email : '#';
                        var rider_department = data[id].department ? data[id].department : 'Cebu Pacific Air Inc.';
                        var rider_fullname = data[id].fullname ? data[id].fullname : 'Unknown';
                        var rider_depart_time = data[id].departTime ? moment(data[id].departTime).utc().format('h:mm a') : 'Unknown';
                        var rider_passengers = data[id].riders ? data[id].riders : null;
                        var offcanvas_rider_is_available = document.querySelector('.offcanvas_rider_is_available')
                        var offcanvas_phone_number = document.querySelector('.offcanvas_phone_number');
                        var offcanvas_rider_passengers_list = document.querySelector('.offcanvas_rider_passengers_list');

                        document.querySelector('.offcanvas_rider_fullname').innerHTML = rider_fullname;
                        document.querySelector('.offcanvas_rider_location').innerHTML = location;
                        document.querySelector('.offcanvas_rider_department').innerHTML = rider_department;
                        document.querySelector('.offcanvas_seats_count').innerHTML = data[id].seats === 1 ? ' seat available' : ' seats available';
                        document.querySelector('.offcanvas_departure_time').innerHTML = rider_depart_time;
                        document.querySelector('.offcanvas_pick_up_point').innerHTML = pick_up_point;
                        document.querySelector('.offcanvas_drop_off_point').innerHTML = drop_off_point;
                        document.querySelector('.offcanvas_teams_email a').href = MS_TEAMS_SEND_MESSAGE_TO_USER_LINK_URL + rider_teams_email;

                        offcanvas_rider_is_available.innerHTML = is_pool_available;
                        offcanvas_phone_number.href = 'tel:' + rider_phone_number;
                        offcanvas_phone_number.innerHTML = rider_phone_number;

                        if (offcanvas_rider_is_available.classList.contains('bg-primary') && data[id].seats < 1) {
                            offcanvas_rider_is_available.classList.remove('bg-primary');
                            offcanvas_rider_is_available.classList.add('bg-secondary');
                        } else {
                            offcanvas_rider_is_available.classList.add('bg-primary');
                            offcanvas_rider_is_available.classList.remove('bg-secondary');
                        }
                        console.log(rider_passengers_count)
                        if (rider_passengers_count > 0) {
                            var blocks = '';

                            for (var i = 0; i < data[id].seatCount; i++) {
                                blocks += emptySeatBlock;
                            }

                            offcanvas_rider_passengers_list.innerHTML = rider_passengers.map(function (passenger) {
                                return '<div class=\"col-3\">'
                                                + '<div class=\"avatar-container\">'
                                                +     '<img class=\"avata\" src=\"../images/sample/no-avatar.png\" />'
                                                + '</div>'
                                                + '<p class=\"text-muted avatar-name\">' + passenger + '</p>'
                                            + '</div>';
                                }).join('') + blocks;
                        } else {
                            var totalEmptySeats = data[id].seatCount - rider_passengers_count;
                            var blocks = '';

                            for (var i = 0; i < totalEmptySeats; i++) {
                                blocks += emptySeatBlock;
                            }

                            document.querySelector('.offcanvas_seats_count').innerHTML = totalEmptySeats + ' seats available';
                            offcanvas_rider_passengers_list.innerHTML = blocks;
                        }

                        join_pool_rider_button.addEventListener('click', onJoinPoolRider(data[id]));
                    });
                });
            } else {
                driver_pool_results_container.innerHTML = NO_RESULTS_FOUND;
            }
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}

function showCarpoolRideListContainer() {
    carpool_ride_list_container.style.display = 'block';
    share_a_ride_container.style.display = 'none';
}
function showFindCarpoolNavigateContainer() {
    find_carpool_navigate_container.style.display ='block';
    driver_pool_results_container.style.display = "none";
}
function showDriverPoolListContainer() {
    find_carpool_navigate_container.style.display = "none";
    driver_pool_results_container.style.display ='block';
}
function showMoreCarpoolButtonsContainer () {
    more_carpool_buttons.style.display = 'flex';
}
function showCarpoolOnTripContainer () {
    carpool_on_trip_container.style.display = 'block';
    find_carpool_navigate_container.style.display = "none";
}
function showTripCancelled () {
    carpool_on_trip_container.style.display = 'none';
    trip_cancelled_container.style.display = 'block';
}
function showTripCompleted () {
    carpool_on_trip_container.style.display = 'none';
    trip_completed_container.style.display = 'block';
}

function hideMoreCarpoolButtonsContainer () {
    more_carpool_buttons.style.display = 'none';
}
function hideDriverPoolResultsContainer () {
    driver_pool_results_container.style.display = 'none';
}
function hideTripCancelled () {
    trip_cancelled_container.style.display = 'none';
}
function hideTripCompleted () {
    trip_completed_container.style.display = 'none';
}

function loadTripCancelledScreen() {
    showTripCancelled();
}
function loadTripCompletedScreen() {
    showTripCompleted();
}
function loadCarpoolOnTripScreen(rider) {
    var tripID = rider._id;
    var passenger = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));
    var payload = {
        "tripID": tripID,
        "email": passenger.email,
        "ridername": passenger.displayName,
        "driver": rider.email,
        "drivername": rider.fullname,
        "destination": rider.origin,
        "booktype": 0
    }
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(BOOK_RIDE_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            hideActivityIndicator();
            join_pool_rider_button.disabled = false;

            if (data) {
                console.log(data);
                localStorage.setItem(DRIVER_BOOKING, JSON.stringify(data));
                localStorage.setItem(CURRENT_BOOKED_TRIP_KEY, rider._id);

                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            } else {}
        })
        .catch(function (err) {
            console.error(err);
	        hideActivityIndicator();
            join_pool_rider_button.disabled = false;
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}


function onCarpoolRidelist () {
    if (share_a_ride_button.classList.contains('active-tab-button')) {
        share_a_ride_button.classList.remove('active-tab-button');
    }

    search_pick_up_point.value = '';
    search_drop_off_point.value = '';
    find_pool_rider_button.disabled = true;
    is_to_drop_switch_rider.checked = false;
    carpool_ride_list_button.classList.add('active-tab-button');
    showCarpoolRideListContainer();
    showFindCarpoolNavigateContainer();
}
function onIsToDropSwitch () {
    search_drop_off_point.value = '';
    search_pick_up_point.value = '';

    if (is_to_drop_switch.checked) {
        search_drop_off_point.style.display = 'block';
        search_pick_up_point.style.display = 'none';
        find_pool_rider_button.disabled = true;
    } else {
        search_pick_up_point.style.display = 'block';
        search_drop_off_point.style.display = 'none';
        find_pool_rider_button.disabled = true;
    }
}
function onIsToDropSwitchRider () {
    search_pick_up_point_rider.value = '';
    search_drop_off_point_rider.value = '';

    if (is_to_drop_switch_rider.checked) {
        search_drop_off_point_rider.style.display = 'block';
        search_pick_up_point_rider.style.display = 'none';
        share_pool_ride_button_rider.disabled = true;
    } else {
        search_pick_up_point_rider.style.display = 'block';
        search_drop_off_point_rider.style.display = 'none';
        share_pool_ride_button_rider.disabled = true;
    }
}
function onFindCarpoolRide () {
    showActivityIndicator();
    showSecondaryTopNavbar();
    hideMoreCarpoolButtonsContainer();
    hideMainBottomNavbar();
    getCarpoolRideList();
}
function onJoinPoolRider (rider) {
    return function () {
        hideDriverPoolResultsContainer();
        showCarpoolOnTripContainer();
        showMainBottomNavbar();
        onIsToDropSwitch();
        showMainTopNavbar();
        showActivityIndicator();
        join_pool_rider_button.disabled = true;
        loadCarpoolOnTripScreen(rider);
    }
}
function onTripCancelled () {
    hideTripCancelled();
    localStorage.removeItem(CURRENT_BOOKED_TRIP_KEY);
    window.location.href = HOMEPAGE_SOURCE_LOCATION;
}
function onTripCompleted () {
    hideTripCompleted();
    localStorage.removeItem(CURRENT_BOOKED_TRIP_KEY);
    window.location.href = HOMEPAGE_SOURCE_LOCATION;
}
function onFindPoolRiderButtonState(e) {
    e.preventDefault();

    if (e.target.value.length > 0) {
        find_pool_rider_button.disabled = false;
    } else {
        find_pool_rider_button.disabled = true;
    }
}

carpool_ride_list_button.addEventListener('click', onCarpoolRidelist);
is_to_drop_switch.addEventListener('change', onIsToDropSwitch);
find_pool_rider_button.addEventListener('click', onFindCarpoolRide);
trip_completed_button.addEventListener('click', onTripCompleted);
trip_cancelled_container.addEventListener('click', onTripCompleted);
search_pick_up_point.addEventListener('keyup', onFindPoolRiderButtonState);
search_drop_off_point.addEventListener('keyup', onFindPoolRiderButtonState);


/** SHARE-A-RIDE */
var share_ride_navigate_container = document.getElementById('share_ride_navigate_container');
var share_ride_navigate_container = document.getElementById('share_ride_navigate_container');
var create_trip_container = document.getElementById('create_trip_container');
var on_trip_driver_container = document.getElementById('on_trip_driver_container');

var share_pool_ride_button_rider = document.getElementById('share_pool_ride_button_rider');
var search_pick_up_point_rider = document.getElementById('search_pick_up_point_rider');
var search_drop_off_point_rider = document.getElementById('search_drop_off_point_rider');
var is_to_drop_switch_rider = document.getElementById('is_to_drop_switch_rider');
var driver_target_location = document.getElementById('driver_target_location');
var driver_available_seats = document.getElementById('driver_available_seats');
var driver_departure_date = document.getElementById('driver_departure_date');
var driver_departure_time = document.getElementById('driver_departure_time');
var driver_contact_no = document.getElementById('driver_contact_no');

function showShareARideContainer() {
    carpool_ride_list_container.style.display = 'none';
    share_a_ride_container.style.display = 'block';
}
function showShareRideNavigateContainer() {
    create_trip_container.style.display = 'none';
    find_carpool_navigate_container.style.display = 'block';
    share_ride_navigate_container.style.display ='block';
    on_trip_driver_container.style.display = 'none';
}
function showCreateTripContainer() {
    create_trip_container.style.display = 'block';
    find_carpool_navigate_container.style.display = 'none';
    share_ride_navigate_container.style.display ='none';
    on_trip_driver_container.style.display = 'none';
}
function showOnTripDriverContainer() {
    on_trip_driver_container.style.display = 'block';
}

function createTrip() {
    var user = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));
    var target_location = driver_target_location.value ? driver_target_location.value : '';
    var available_seats = driver_available_seats.value ? driver_available_seats.value : 0;
    var departure_datetime = moment(driver_departure_date.value + ' ' + driver_departure_time.value).format("YYYY-MM-DDTHH:mm") + ':00.000Z';
    var contact_no = driver_contact_no.value ? '63' + driver_contact_no.value.replace(/(\s)/gi, '') : '#';
    var payload = {
        "email": user.email.toLowerCase(),
        "fullname": user.displayName,
        "department": user.jobTitle ? user.jobTitle : 'Cebu Pacifir Air, Inc.',
        "phone": contact_no,
        "origin": target_location,
        "seats": parseInt(available_seats),
        "tripType": 0,
        "riders": [],
        "status": 0,
        "departTime": departure_datetime
    };
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(CREATE_TRIP_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            console.log("trip created. put in local storage");
            localStorage.setItem(DRIVER_TRIP, JSON.stringify(data));
        
            hideActivityIndicator();
            showSuccessAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Trip has been created', '', 'Done');
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                driver_target_location.disabled = false;
                driver_available_seats.disabled = false;
                driver_departure_date.disabled = false;
                driver_departure_time.disabled = false;
                driver_contact_no.disabled = false;
                create_trip_button.disabled = true;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function startTrip(_id, riders) {
    var payload = {
        tripID: _id,
        riders: riders,
        status: 1
    };
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(UPDATE_TRIP_STATUS_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            document.getElementById('start_driver_trip_button').disabled =true;
            document.getElementById('cancel_driver_trip_button').disabled = false;
            document.getElementById('complete_driver_trip_button').disabled = false;

            document.querySelector('.on-trip-driver-body').style.display = 'block';
            document.getElementById('refresh_driver_page_button').style.display = 'none';
            document.getElementById('start_driver_trip_button').style.display = 'none';
            document.getElementById('cancel_driver_trip_button').style.display = 'block';
            document.getElementById('complete_driver_trip_button').style.display = 'block';

            document.querySelector('.offcanvas_driver_trip_status').innerHTML = 'Trip ongoing';

            hideActivityIndicator();

            localStorage.setItem(DRIVER_TRIP_STATUS_KEY, 'ongoing');
        })
        .catch(function (err) {
            console.error(err);
	        hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function cancelTrip(_id, riders) {
    var payload = {
        tripID: _id,
        riders: riders,
        status: 3
    };
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(UPDATE_TRIP_STATUS_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            document.querySelector('.on-trip-driver-body').style.display = 'block';
            document.getElementById('refresh_driver_page_button').style.display = 'block';
            document.getElementById('cancel_driver_trip_button').style.display = 'none';
            document.getElementById('start_driver_trip_button').style.display = 'none';
            document.getElementById('complete_driver_trip_button').style.display = 'none';
            document.querySelector('.offcanvas_driver_trip_status').innerHTML = 'Trip cancelled';

            hideActivityIndicator();

            localStorage.removeItem(DRIVER_TRIP_STATUS_KEY);
            localStorage.removeItem(DRIVER_TRIP);
        })
        .catch(function (err) {
            console.error(err);
	        hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function completeTrip(_id, riders) {
    var payload = {
        tripID: _id,
        riders: riders,
        status: 2
    };
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(UPDATE_TRIP_STATUS_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            document.querySelector('.on-trip-driver-body').style.display = 'block';

            hideActivityIndicator();

            showSuccessAlertWithConfirmButton(function () {
                localStorage.removeItem(DRIVER_TRIP_STATUS_KEY);
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Trip has been completed', '', 'Done');
        })
        .catch(function (err) {
            console.error(err);
	        hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}

function onIsToDropSwitchRider () {
    search_drop_off_point_rider.value = '';
    search_pick_up_point_rider.value = '';

    if (is_to_drop_switch_rider.checked) {
        search_drop_off_point_rider.style.display = 'block';
        search_pick_up_point_rider.style.display = 'none';
        share_pool_ride_button_rider.disabled = true;
    } else {
        search_pick_up_point_rider.style.display = 'block';
        search_drop_off_point_rider.style.display = 'none';
        share_pool_ride_button_rider.disabled = true;
    }
}
function onShareCarpoolRide () {
    if (carpool_ride_list_button.classList.contains('active-tab-button')) {
        carpool_ride_list_button.classList.remove('active-tab-button');
    }

    search_pick_up_point_rider.value = '';
    search_drop_off_point_rider.value = '';
    share_pool_ride_button_rider.disbaled = true;
    share_a_ride_button.classList.add('active-tab-button');
    is_to_drop_switch.checked = false;
    showShareARideContainer();
    showShareRideNavigateContainer();
    onIsToDropSwitchRider();
}
function onMoreShareRide() {
    showSecondaryTopNavbar();
    hideMoreCarpoolButtonsContainer();
    hideMainBottomNavbar();
    showCreateTripContainer();
    
    driver_target_location.value = '';
    driver_available_seats.value = '';
    driver_departure_date.value = '';
    driver_departure_time.value = '';
    driver_contact_no.value = '';

    var target_location = search_pick_up_point_rider.value ? search_pick_up_point_rider.value : search_drop_off_point_rider.value;

    new Cleave(driver_contact_no, {
        numericOnly: true,
        blocks: [0, 2, 3, 4],
        delimiters: ['9', ' ', ' ']
    });

    new Cleave(driver_departure_date, {
        date: true,
        delimiter: '-',
        datePattern: ['Y', 'm', 'd']
    });

    new Cleave(driver_departure_time, {
        time: true,
        timePattern: ['h', 'm']
    });

    driver_target_location.value = target_location;
}
function onCreateTrip() {
    var given = moment(driver_departure_date.value + ' ' + driver_departure_time.value, "YYYY-MM-DD HH:mm");
    var current = new Date();
    var numberPattern = /([0-9])/g;
    var timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g;
    var datePattern = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    var phonePattern = /(9[0-9]{2}\s([0-9]{3}\s)[0-9]{4})/;
    var isAllNumeric = numberPattern.test(driver_available_seats.value) && numberPattern.test(driver_contact_no.value.replace(/\s/g, ''));
    var inTimeFormat = timePattern.test(driver_departure_time.value);
    var inDateFormat = datePattern.test(driver_departure_date.value);
    var inPhoneFormat = phonePattern.test(driver_contact_no.value);
    var duration = moment.duration(given.diff(current)).asHours();
    var isWithinScopeDuration = duration >= 0.5 && duration <= 5 ? true : false;
    var isSeatMaxLength = parseInt(driver_available_seats.value) > 0 && parseInt(driver_available_seats.value) <= 30;

    if (!inDateFormat) {
        showErrorAlert('Invalid date format', 'Departure date must be in this format: YYYY-MM-DD');
    } else if (!inTimeFormat) {
        showErrorAlert('Invalid time format', 'Departure time must be in 24-hour clock: hh:mm');
    } else if (!isAllNumeric) {
        showErrorAlert('Invalid number format', 'Seat Number should numbers (0 to 9)');
    } else if (!inPhoneFormat) {
        showErrorAlert('Invalid phone number format', 'Phone number should be in this format: 9xx xxx xxxx or 9xxxxxxxxx');
    } else if (!isSeatMaxLength) {
        showErrorAlert('Invalid seat number', 'Seat numbers can be only up to 30');
    } else if (!isWithinScopeDuration) {
        showErrorAlert('Invalid departure time', 'Departure must be set at least 30 minutes up to 5 hours from current date and time');
    } else {
        showQuestionAlertWithButtons(function () {
            driver_target_location.disabled = true;
            driver_available_seats.disabled = true;
            driver_departure_date.disabled = true;
            driver_departure_time.disabled = true;
            driver_contact_no.disabled = true;
            create_trip_button.disabled = true;
            showActivityIndicator();
            createTrip();
        }, 'Create Trip', 'Are you sure you want to continue?', 'Yes', 'No');
    }

}
function onStartTrip(_id, riders) {
    return function() {
        showQuestionAlertWithButtons(function () {
            showActivityIndicator();
            document.querySelector('.on-trip-driver-body').style.display = 'none';
            document.getElementById('start_driver_trip_button').disabled =true;
            document.getElementById('cancel_driver_trip_button').disabled = true;
            document.getElementById('complete_driver_trip_button').disabled = true;
            startTrip(_id, riders);
        }, 'Start Trip', 'Are you sure you want to continue?', 'Yes', 'No');
    }
}
function onCancelTrip(_id, riders) {
    return function () {
        showQuestionAlertWithButtons(function () {
            showActivityIndicator();
            document.querySelector('.on-trip-driver-body').style.display = 'none';
            document.getElementById('start_driver_trip_button').disabled =true;
            document.getElementById('cancel_driver_trip_button').disabled = true;
            document.getElementById('complete_driver_trip_button').disabled = true;
            cancelTrip(_id, riders);
        }, 'Cancel Trip', 'Are you sure you want to continue?', 'Yes', 'No');
    }
}
function onCompleteTrip(_id, riders) {
    return function () {
        showQuestionAlertWithButtons(function () {
            showActivityIndicator();
            document.querySelector('.on-trip-driver-body').style.display = 'none';
            document.getElementById('start_driver_trip_button').disabled =true;
            document.getElementById('cancel_driver_trip_button').disabled = true;
            document.getElementById('complete_driver_trip_button').disabled = true;
            completeTrip(_id, riders);
        }, 'Complete Trip', 'Are you sure you want to continue?', 'Yes', 'No');
    }
}
function onSharePoolRideButtonState(e) {
    e.preventDefault();

    if (e.target.value.length > 0) {
        share_pool_ride_button_rider.disabled = false;
    } else {
        share_pool_ride_button_rider.disabled = true;
    }
}
function onCreateTripRequiredFields(e) {
    e.preventDefault();

    var requiredFields = driver_target_location.value.length > 0 &
                            driver_available_seats.value.length > 0 &
                            driver_departure_date.value.length > 0 &
                            driver_departure_time.value.length > 0 &
                            driver_contact_no.value.length > 0;

    if (requiredFields === 1) {
        create_trip_button.disabled = false;
    } else {
        create_trip_button.disabled = true;
    }
}

share_a_ride_button.addEventListener('click', onShareCarpoolRide);
is_to_drop_switch_rider.addEventListener('click', onIsToDropSwitchRider);
share_pool_ride_button_rider.addEventListener('click', onMoreShareRide);
create_trip_button.addEventListener('click', onCreateTrip);
search_pick_up_point_rider.addEventListener('keyup', onSharePoolRideButtonState);
search_drop_off_point_rider.addEventListener('keyup', onSharePoolRideButtonState);
driver_target_location.addEventListener('keyup', onCreateTripRequiredFields);
driver_available_seats.addEventListener('keyup', onCreateTripRequiredFields);
driver_departure_date.addEventListener('keyup', onCreateTripRequiredFields);
driver_departure_time.addEventListener('keyup', onCreateTripRequiredFields);
driver_contact_no.addEventListener('keyup', onCreateTripRequiredFields);


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.carpool-page-container').style.display = 'none';
    showActivityIndicator();

    if (checkCurrentSession()) {
        checkAppVersion(function () {
            reloadCurrentPage();
        }, moveToLoginPage);
    } else {
        moveToLoginPage();
        localStorage.removeItem(CURRENT_APP_VERSION_KEY);
    }
});