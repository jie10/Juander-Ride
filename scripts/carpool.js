/** LOCAL STORAGE */
var USER_LOGIN_DATA_KEY = 'user_login_data';
var DRIVER_TRIP_STATUS_KEY = 'driver_trip_status';
var DRIVER_TRIP = 'driver_trip';
var DRIVER_BOOKING = 'user_booking';
var USER_DATA_TRIP_CHECK = 'user_data_trip_check';
var USER_DATA_BOOKING_CHECK = 'user_data_booking_check';

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
var PLAY_BOOKING_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/play';
var USER_STATUS_CHECK_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/check';
var POST_DRIVER_TRIPS_PREDEPARTURE_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/messaging';

/** SOURCE LOCATION */
var HOMEPAGE_SOURCE_LOCATION = '../index.html';
var ACCOUNTPAGE_SOURCE_LOCATION = '../pages/account.html';
var CARPOOLPAGE_SOURCE_LOCATION = '../pages/carpool.html';

/** COMPONENTS */
var NO_RESULTS_FOUND = "<p class=\"text-muted absolute-center text-center\" style=\"font-weight: 700; font-size: 1.5rem; width: 80%; padding: 36px 16px; background-color: #f7f7f7;\">No results found</p>";

/** DOM ELEMENTS */
var carpool_ride_list_container = document.getElementById('carpool_ride_list_container');
var share_a_ride_container = document.getElementById('share_a_ride_container');
var carpool_main_page = document.getElementById('carpool_main_page');
var carpool_on_booking_container = document.getElementById('carpool_on_booking_container');

var carpool_ride_list_button = document.getElementById('carpool_ride_list_button');
var share_a_ride_button = document.getElementById('share_a_ride_button');
var back_to_previous_page_button = document.getElementById('back_to_previous_page_button');
var driver_trip_predeparture_btn = document.getElementById('driver_trip_predeparture_btn');
var driver_trip_start_btn = document.getElementById('driver_trip_start_btn');
var driver_trip_cancel_btn = document.getElementById('driver_trip_cancel_btn');
var driver_trip_complete_btn = document.getElementById('driver_trip_complete_btn');
var driver_trip_booking_list = document.getElementById('driver_trip_booking_list');


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
        case 4:
            return {
                trip_status: 'ongoing',
                withButtons: false,
                statusColor: '#075A70',
                color: '#fff',
                bgColor: '#029481',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        default: return null;
    }
}
function getStatusPopup(bookingID, status, driverEmail, tripID, userEmail) {
    switch(status) {
        case 0:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                cancelTripBooking(bookingID, tripID, userEmail);
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
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Booking cancelled', 'Driver has cancelled your booking request', 'Done');
            break;
        case 3:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                localStorage.removeItem(DRIVER_BOOKING);
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Booking finished', 'Hope you had a great car pooling experience', 'Done');
            break;
        default: break;
    }
}
function getTripStatusPopup(tripID, status, riders, payload = null) {
    switch(status) {
        case 1:
            showQuestionAlertWithButtons(function () {
                showActivityIndicator();
                driver_trip_predeparture_btn.disabled = true;
                driver_trip_start_btn.disabled = true;
                driver_trip_cancel_btn.disabled = true;
                driver_trip_complete_btn.disabled = true;
                startTrip(tripID, riders);
            }, 'Trip Pending', 'Would you like to start your trip?', 'Yes', 'No');
            break;
        case 2:
            showQuestionAlertWithButtons(function () {
                showActivityIndicator();
                driver_trip_predeparture_btn.disabled = true;
                driver_trip_start_btn.disabled = true;
                driver_trip_cancel_btn.disabled = true;
                driver_trip_complete_btn.disabled = true;

                completeTrip(tripID, riders);
            }, 'Ongoing Trip', 'Would you like to complete your trip?', 'Yes', 'No');
            break;
        case 3:
            showQuestionAlertWithButtons(function () {
                showActivityIndicator();
                driver_trip_predeparture_btn.disabled = true;
                driver_trip_start_btn.disabled = true;
                driver_trip_cancel_btn.disabled = true;
                driver_trip_complete_btn.disabled = true;
                cancelTrip(tripID, riders);
            }, 'Trip Pending', 'Would you like to cancel your trip?', 'Yes', 'No');
            break;
        // booking pop-ups
        case 4:
            showQuestionAlertWithButtons(function () {
                showActivityIndicator();
                driver_trip_predeparture_btn.disabled = true;
                driver_trip_start_btn.disabled = true;
                driver_trip_cancel_btn.disabled = true;
                driver_trip_complete_btn.disabled = true;
                confirmTripBooking(payload);
            }, 'Confirm Booking', 'Would you like to confirm this booking?', 'Yes', 'No');
            break;
        default: break;
    }
}

function getRiderBookingsStatusAPI(booking) {
    if(booking['booktype'] == 0){
        var timeFromNowFormat = moment(booking.departTime).utc().format('MMMM D YYYY  h:mm a');
        var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
        var drivernameArr = booking.drivername.split(' ');
        var destination = booking.destination;
        var bookingStatus = getStatusIndicator(booking.tripStatus != 1 ? booking.status: 4);

        var bookingName = (booking.booktype === 0 ? capitalize(drivernameArr[drivernameArr.length - 1]) : capitalize(destination.split(' ')[0])) + ' Ride';

        carpool_main_page.style.display = 'block';
        find_carpool_navigate_container.style.display = 'none';
        carpool_on_booking_container.style.display = 'block';

        document.querySelector('.current-booking-item').style.backgroundColor = bookingStatus.bgColor;
        document.querySelector('.current-booking-item .heading').innerHTML = bookingName;

        document.querySelector('.current-booking-item .status').style.backgroundColor = bookingStatus.statusColor;
        document.querySelector('.current-booking-item .status').style.color = bookingStatus.color;
        document.querySelector('.current-booking-item .status').innerHTML = bookingStatus.trip_status;
        document.querySelector('.current-booking-item .datetime').innerHTML = capitalize(timeFromNow) + ' ' + timeFromNowFormat;
        document.querySelector('.current-booking-item .destination').innerHTML = booking.destination;
        document.querySelector('.current-booking-item .seat-number').innerHTML = booking.seatCount + ' / ' + booking.seats + ' seats';

        if(booking.tripStatus == 1){
            document.querySelector('.current-booking-item .heading').style.color = '#fff'
            document.querySelector('.current-booking-item .datetime').style.color = '#fff'
            document.querySelector('.current-booking-item .destination').style.color = '#fff'
            document.querySelector('.current-booking-item .seat-number').style.color = '#fff'
        }

        document.querySelector('.current-booking-item').addEventListener('click', function () {
            getStatusPopup(booking._id, booking.status, booking.driver, booking.tripID, booking.email);
        });

        hideActivityIndicator();
    }else{
        loadMainPage();
        hideActivityIndicator();
    }
}

function confirmTripBooking(payload){
    showActivityIndicator();

    var objPayload = {
        "email": payload.email,
        "bookID": payload.bookingID,
        "tripID": payload.tripID,
        "status": 1
    }
    
    var options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(objPayload)
    };

    fetch(PLAY_BOOKING_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            delay(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function cancelTripBooking(bookingID, tripID, userEmail){
    showActivityIndicator();

    var payload = {
        "email": userEmail,
        "bookID": bookingID,
        "tripID": tripID,
        "status": 2
    };

    var options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    };

    fetch(PLAY_BOOKING_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            delay(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}

function onBookingSelect(event, payload){
    getTripStatusPopup("", 4, [], event)
}

function addBooking(payload, status) {
    var booking = document.createElement("div");
    var listStyle = ''
    var name = ''
    var location = ''
    var statusMessage = ''
    
    switch(status) {
      case -1:
        listStyle = 'list-item-vacant'
        name = 'Seat'
        location = 'for booking'
        statusMessage = 'vacant'
        break;
      case 0:
        listStyle = 'list-item'
        name = payload.fullName.split(" ")[0]
        location = payload.destination
        statusMessage = 'pending'
        break;
      case 1:
        listStyle = 'list-item-confirmed'
        name = payload.fullName.split(" ")[0]
        location = payload.destination
        statusMessage = 'confirmed'
        break;
      default:
        listStyle = 'list-item'
        name = payload.fullName.split(" ")[0]
        location = payload.destination
        statusMessage = 'pending'
    }
    
    booking.className = listStyle;
    
    if(status == 0){
        booking.addEventListener("click", onBookingSelect.bind(event, payload), false);
    }
    
    booking.innerHTML = "<div class='on-driver-trip-rider'>"
    + "<p class='on-driver-trip-rider-name'>"+name+"</p>"
    + "<p class='on-driver-trip-rider-location'>"+location+"</p>"
    + "</div>"
    + "<div class='on-driver-trip-booking-status'>"
    + "<p>"+statusMessage+"</p>"
    + "</div>"
    + "</div>"

    driver_trip_booking_list.appendChild(booking);
}

function getDriverTripSessionAPI(trip) {
    carpool_main_page.style.display = 'block';
    carpool_ride_list_container.style.display = 'none';
    driver_trip_booking_list.style.display = 'block';
    hideMoreCarpoolButtonsContainer();
    showOnTripDriverContainer();
    
    var tripID = trip._id;
    var seats = trip.seats;
    var tripStatus = trip.status;
    var timeFromNowFormat = moment(trip.departTime).utc().format('MMMM D, YYYY  h:mm a');
    var departureTime = moment(trip.departTime).utc().format('h:mm a');
    var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
    var drivernameArr = trip.fullname.split(' ');
    var origin = trip.origin;
    var bookingName = capitalize(drivernameArr[drivernameArr.length - 1])  + ' Ride';

    document.getElementById('on_driver_trip_booking_name').innerHTML = bookingName;
    document.getElementById('on_driver_trip_departure_datetime').innerHTML = capitalize(timeFromNow) + ' ' + timeFromNowFormat;
    document.getElementById('on_driver_trip_location').innerHTML = origin;
    document.getElementById('on_driver_trip_departure_time').innerHTML = "<span style='font-weight: bold;'>Departure: </span>" + departureTime;
    document.getElementById('on_driver_trip_seat_number').innerHTML = trip.seatCount + '/' + trip.seats;

    if (tripStatus === 1) {
        driver_trip_predeparture_btn.style.display = 'none';
        driver_trip_start_btn.style.display = 'none';
        driver_trip_cancel_btn.style.display = 'none';
        driver_trip_complete_btn.style.display = 'block';
    } else if (tripStatus === 0) {
        driver_trip_predeparture_btn.style.display = 'block';
        driver_trip_start_btn.style.display = 'block';
        driver_trip_cancel_btn.style.display = 'block';
        driver_trip_complete_btn.style.display = 'none';
    }

    // Create trip seats
    trip.temp.map(rider => {
        rider['tripID'] = tripID;
        addBooking(rider, 0);
        seats -= 1;
    });

    trip.riders.map(rider => {
        rider['tripID'] = tripID;
        addBooking(rider, 1);
        seats -= 1;
    });

    for (let i = 0; i < seats; i++) { 
        var rider = {}
        addBooking(rider, -1);
    }

    driver_trip_predeparture_btn.disabled = trip.riders.length > 0 ? false : true;
    driver_trip_start_btn.disabled = trip.riders.length > 0 ? false : true;
    
    if(trip.riders.length > 0){
        driver_trip_predeparture_btn.style.backgroundColor = "#05a5df"
        driver_trip_predeparture_btn.style.color = "#fff"
        driver_trip_start_btn.style.backgroundColor = "#05a5df"
        driver_trip_start_btn.style.color = "#fff"
    }

    driver_trip_predeparture_btn.addEventListener('click', function(e) {
        var payload = {
            tripID: trip._id,
            messageType: "JPD"
        };
        var options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        };

        fetch(POST_DRIVER_TRIPS_PREDEPARTURE_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            if (data.code === 200) {
                showSuccessAlertWithConfirmButton(function () {

                }, 'Message sent', 'Pre-departure message has been sent to your passengers', 'Done');
            } else {
                showErrorAlertWithConfirmButton(callback, 'Error', 'Message not sent to your passengers', 'Done')
            }
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
    });
    driver_trip_start_btn.addEventListener('click', function(e) {
        return getTripStatusPopup(tripID, 1, trip.riders);
    });
    driver_trip_cancel_btn.addEventListener('click', function (e) {
        return getTripStatusPopup(tripID, 3, trip.riders);
    });driver_trip_complete_btn
    driver_trip_complete_btn.addEventListener('click', function (e) {
        return getTripStatusPopup(tripID, 2, trip.riders);
    });

    delay(function () {
        hideActivityIndicator();
    }, DELAY_TIME_IN_MILLISECONDS);
}

function loadMainPage() {
    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));
    carpool_main_page.style.display = 'block';

    showFindCarpoolNavigateContainer();
    showShareRideNavigateContainer();
    showMoreCarpoolButtonsContainer();
    showShareRideNavigateContainer();
    search_target_location.value = user_login_data && user_login_data.address ? user_login_data.address : '';
    search_target_location_driver.value = user_login_data && user_login_data.address ? user_login_data.address : '';
    find_pool_rider_button.disabled = user_login_data && user_login_data.address ? false : true;
    share_pool_ride_button_rider.disabled = user_login_data && user_login_data.address ? false : true;
    carpool_on_booking_container.style.display = 'none';
}
function reloadCurrentPage() {
    showActivityIndicator();

    delay(function () {
        showMainBottomNavbar();
        showMainTopNavbar();
        
        // check profile if there is an ongoing booking or trip
        var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email.toLowerCase();
        JUANDERSERVICE.userStatusCheck(email)
        .then(getResJSON)
        .then(function (data) {
            if(data['trip'] == null && data['booking'] == null){
                localStorage.setItem(DRIVER_TRIP, null)
                localStorage.setItem(DRIVER_BOOKING, null)
                hideActivityIndicator();
                loadMainPage();
            } else if(data['trip'] != null && data['booking'] != null){
                console.error('user can only either have 1 trip or 1 booking');
                hideActivityIndicator();
                showErrorAlertWithConfirmButton(function () {
                    window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                }, 'Error 500', 'System Error', 'Refresh');
            }

            if(data['trip'] != null){
                localStorage.setItem(DRIVER_TRIP, JSON.stringify(data['trip']))
                getDriverTripSessionAPI(data['trip']);
            }
            
            if(data['booking'] != null){
                if (data['booking'].status === 0 || data['booking'].status === 1) {
                    localStorage.setItem(DRIVER_BOOKING, JSON.stringify(data['booking']))

                    getRiderBookingsStatusAPI(data['booking'])
                } else {
                    localStorage.setItem(DRIVER_BOOKING, null)
                    hideActivityIndicator();
                    loadMainPage();
                }
            }
            
        })
        .catch(function (err) {
            console.error(err);
	        hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });

        
        
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

var show_confirm_carpool_rider = document.getElementById('show_confirm_carpool_rider');
var search_target_location = document.getElementById('search_target_location');

var more_carpool_buttons = document.getElementById('more_carpool_buttons');
var find_pool_rider_button = document.getElementById('find_pool_rider_button');
var trip_completed_button = document.getElementById('trip_completed_button');
var join_pool_rider_button = document.getElementById('join_pool_rider_button');

function getCarpoolRideList() {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var pointA = search_target_location.value;
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
                    var seat_total = driver.seats;
                    var seat_count = driver.seatCount;
                    //var seat_total = driver.seats + driver.temp.length + driver.riders.length;
                    //var seat_count = seat_total - driver.riders.length;

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
                        var target_location = data[id].origin;
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
                        document.querySelector('.offcanvas_target_location').innerHTML = target_location;
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
                                                + '<p class=\"text-muted avatar-name\">' + passenger.email + '</p>'
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
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
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

function hideMoreCarpoolButtonsContainer () {
    more_carpool_buttons.style.display = 'none';
}
function hideDriverPoolResultsContainer () {
    driver_pool_results_container.style.display = 'none';
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
                localStorage.setItem(DRIVER_BOOKING, JSON.stringify(data));

                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            } else {}
        })
        .catch(function (err) {
            console.error(err);
	        hideActivityIndicator();
            join_pool_rider_button.disabled = false;
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}


function onCarpoolRidelist () {
    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

    if (share_a_ride_button.classList.contains('active-tab-button')) {
        share_a_ride_button.classList.remove('active-tab-button');
    }

    search_target_location.value = user_login_data && user_login_data.address ? user_login_data.address : '';
    find_pool_rider_button.disabled = user_login_data && user_login_data.address ? false : true;

    carpool_ride_list_button.classList.add('active-tab-button');
    showCarpoolRideListContainer();
    showFindCarpoolNavigateContainer();
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
        showMainBottomNavbar();
        showMainTopNavbar();
        showActivityIndicator();
        join_pool_rider_button.disabled = true;
        loadCarpoolOnTripScreen(rider);
    }
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
find_pool_rider_button.addEventListener('click', onFindCarpoolRide);
search_target_location.addEventListener('keyup', onFindPoolRiderButtonState);


/** SHARE-A-RIDE */
var share_ride_navigate_container = document.getElementById('share_ride_navigate_container');
var share_ride_navigate_container = document.getElementById('share_ride_navigate_container');
var create_trip_container = document.getElementById('create_trip_container');
var on_trip_driver_container = document.getElementById('on_trip_driver_container');

var share_pool_ride_button_rider = document.getElementById('share_pool_ride_button_rider');
var search_target_location_driver = document.getElementById('search_target_location_driver');
var driver_target_location = document.getElementById('driver_target_location');
var driver_available_seats = document.getElementById('driver_available_seats');
var driver_contact_no = document.getElementById('driver_contact_no');
var driver_depature_datetime = document.getElementById('depature_datetime');

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
    var departure_datetime = moment(new Date(driver_depature_datetime.value)).format("YYYY-MM-DDTHH:mm") + ':00.000Z';
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
            localStorage.setItem(DRIVER_TRIP, JSON.stringify(data));
        
            hideActivityIndicator();
            showSuccessAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Trip has been created', '', 'Done');
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                driver_target_location.disabled = false;
                driver_available_seats.disabled = false;
                driver_depature_datetime.disabled = false;
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
            driver_trip_predeparture_btn.disabled = true;
            driver_trip_start_btn.disabled = true;
            driver_trip_cancel_btn.disabled = true;
            driver_trip_complete_btn.disabled = false;

            driver_trip_predeparture_btn.style.display = 'none';
            driver_trip_start_btn.style.display = 'none';
            driver_trip_cancel_btn.style.display = 'none';
            driver_trip_complete_btn.style.display = 'block';

            hideActivityIndicator();

            localStorage.setItem(DRIVER_TRIP_STATUS_KEY, 'ongoing');
        })
        .catch(function (err) {
            console.error(err);
	        hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
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
            hideActivityIndicator();
            showSuccessAlertWithConfirmButton(function () {
                localStorage.removeItem(DRIVER_TRIP_STATUS_KEY);
                localStorage.removeItem(DRIVER_TRIP);
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Trip has been cancelled', '', 'Done');
        })
        .catch(function (err) {
            console.error(err);
	        hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
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
            hideActivityIndicator();

            showSuccessAlertWithConfirmButton(function () {
                localStorage.removeItem(DRIVER_TRIP_STATUS_KEY);
                localStorage.removeItem(DRIVER_TRIP);
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Trip has been completed', '', 'Done');
        })
        .catch(function (err) {
            console.error(err);
	        hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}

function onShareCarpoolRide () {
    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

    if (carpool_ride_list_button.classList.contains('active-tab-button')) {
        carpool_ride_list_button.classList.remove('active-tab-button');
    }

    search_target_location_driver.value = user_login_data && user_login_data.address ? user_login_data.address : '';
    share_pool_ride_button_rider.disabled = user_login_data && user_login_data.address ? false : true;

    share_a_ride_button.classList.add('active-tab-button');
    showShareARideContainer();
    showShareRideNavigateContainer();
}
function onMoreShareRide() {
    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

    showSecondaryTopNavbar();
    hideMoreCarpoolButtonsContainer();
    hideMainBottomNavbar();
    showCreateTripContainer();

    var target_location = search_target_location_driver.value;

    driver_target_location.value = target_location;
    driver_available_seats.value = '';
    driver_depature_datetime.value = '';
    driver_contact_no.value = user_login_data && user_login_data.mobileNumber ? user_login_data.mobileNumber : '';

    new Cleave(driver_contact_no, {
        numericOnly: true,
        blocks: [0, 2, 3, 4],
        delimiters: ['9', ' ', ' ']
    });

    new tempusDominus.TempusDominus(driver_depature_datetime, {
        useCurrent: true,
        allowInputToggle: true,
        display: {
            buttons: {
                today: true,
                clear: true,
                close: true,
            },
            components: {
                useTwentyfourHour: true
            }
        }
    });
}
function onCreateTrip() {
    var givenDate = moment(new Date(driver_depature_datetime.value)).format("YYYY-MM-DD HH:mm");
    var given =  moment(new Date(givenDate), "YYYY-MM-DD HH:mm");
    var current = new Date();

    var numberPattern = /([0-9])/g;
    var phonePattern = /(9[0-9]{2}\s([0-9]{3}\s)[0-9]{4})/;

    var isAllNumeric = numberPattern.test(driver_available_seats.value) && numberPattern.test(driver_contact_no.value.replace(/\s/g, ''));
    var inPhoneFormat = phonePattern.test(driver_contact_no.value);

    var duration = moment.duration(given.diff(current)).asHours();
    var isWithinScopeDuration = duration >= 0.5 && duration <= 5 ? true : false;

    var isSeatMaxLength = parseInt(driver_available_seats.value) > 0 && parseInt(driver_available_seats.value) <= 30;

    if (!isAllNumeric) {
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
            driver_depature_datetime.disabled = true;
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
                            driver_depature_datetime.value.length > 0 &
                            driver_contact_no.value.length > 0;

    if (requiredFields === 1) {
        create_trip_button.disabled = false;
    } else {
        create_trip_button.disabled = true;
    }
}

share_a_ride_button.addEventListener('click', onShareCarpoolRide);
share_pool_ride_button_rider.addEventListener('click', onMoreShareRide);
create_trip_button.addEventListener('click', onCreateTrip);
search_target_location_driver.addEventListener('keyup', onSharePoolRideButtonState);
driver_target_location.addEventListener('keyup', onCreateTripRequiredFields);
driver_available_seats.addEventListener('keyup', onCreateTripRequiredFields);
driver_depature_datetime.addEventListener('change', onCreateTripRequiredFields);
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