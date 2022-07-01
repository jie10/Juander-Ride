/** LOCAL STORAGE */
var USER_LOGIN_DATA_KEY = 'user_login_data';
var DRIVER_TRIP_STATUS_KEY = 'driver_trip_status';
var DRIVER_TRIP = 'driver_trip';
var DRIVER_BOOKING = 'user_booking';
var USER_DATA_TRIP_CHECK = 'user_data_trip_check';
var USER_DATA_BOOKING_CHECK = 'user_data_booking_check';
var CURRENT_APP_VERSION_KEY = 'current_app_version';
var USER_LOGIN_DATA_KEY = 'user_login_data';
var CREATED_TRIPS_HISTORY_LIST = 'created_trips_history_list'

/** CONSTANT VALUES */
var DELAY_TIME_IN_MILLISECONDS = 1000;
var regions = Object.keys(location_list);
var MS_TEAMS_SEND_MESSAGE_TO_USER_LINK_URL = 'https://teams.microsoft.com/l/chat/0/0?users=';
var PHONE_CALL_TO_USER_LINK_URL = 'tel:+';
var driver_stops = [];
var is_new_driver_stop = false;
var find_carpool_search_key;
var share_carpool_search_key;

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
var CHECK_ADDRESS_API_ENDPONT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/address';
var GET_USER_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/profile';
var UPDATE_USER_INFO_API_ENPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/profile';

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

var address_field_change_button_group = document.getElementById('address_field_change_button_group');
var target_location_id = document.getElementById('target_location_id');
var add_new_stops_button = document.getElementById('add_new_stops_button');
var target_location_region = document.getElementById('target_location_region');
var target_location_province = document.getElementById('target_location_province');
var target_location_municipality = document.getElementById('target_location_municipality');
var target_location_barangay = document.getElementById('target_location_barangay');
var update_new_address_container = document.getElementById('update_new_address_container');
var carpool_container = document.getElementById('carpool_container');

var new_target_location_landmark = document.getElementById('new_target_location_landmark');
var new_target_location_region = document.getElementById('new_target_location_region');
var new_target_location_province = document.getElementById('new_target_location_province');
var new_target_location_municipality = document.getElementById('new_target_location_municipality');
var new_target_location_barangay = document.getElementById('new_target_location_barangay');
var new_address_confirm_button = document.getElementById('new_address_confirm_button');

var find_carpool_address_list = document.getElementById('find_carpool_address_list');
var share_carpool_address_list = document.getElementById('share_carpool_address_list');

var _cacheExpiry = -(1/60); // 1 minute

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
                statusColor: '#f78e33',
                color: '#fff6ee',
                bgColor: '#fff6ee',
                origin: 'Coming from ',
                destination: 'Going to ',
                target_location: 'Target location is ',
                action: 'On trip with '
            }
        case 1:
            return {
                trip_status: 'Confirmed',
                withButtons: false,
                statusColor: '#5aa949',
                color: '#ecf5e4',
                bgColor: '#ecf5e4',
                origin: 'Coming from ',
                destination: 'Going to ',
                target_location: 'Target location is ',
                action: 'On trip with '
            }
        case 2:
            return {
                trip_status: 'Cancelled',
                withButtons: false,
                statusColor: '#858586',
                color: '#e2e3e2',
                bgColor: '#e2e3e2',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        case 3:
            return {
                trip_status: 'Ongoing',
                withButtons: false,
                statusColor: '#0061a8',
                color: '#eaf6f8',
                bgColor: '#eaf6f8',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        case 4:
            return {
                trip_status: 'Completed',
                withButtons: false,
                statusColor: '#009883',
                color: '#bafff6',
                bgColor: '#bafff6',
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
                cancelTripBooking(bookingID, tripID, userEmail);
            }, 'Booking confirmed', 'Driver has confirmed your booking request', 'Cancel Booking');
            break;
        case 2:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                localStorage.removeItem(DRIVER_BOOKING);
                console.log('Driver has cancelled your booking request');
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Booking cancelled', 'Driver has cancelled your booking request', 'Done');
            break;
        case 3:
            showQuestionAlertWithButtons(function () {
                completeTripBooking(bookingID, tripID, userEmail);
            }, 'Booking Ongoing', "Do you want to complete the trip now?", 'Yes', 'No')

            break;
        case 4:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                localStorage.removeItem(DRIVER_BOOKING);
                console.log('Hope you had a great car pooling experience');
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
    // console.log('shall pass too', booking)
    if(booking['booktype'] == 0){
        var timeFromNowFormat = moment(booking.departTime).utc().format('MMMM D YYYY  h:mm a');
        var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
        var drivernameArr = booking.drivername.split(' ');
        var destination = booking.destination;
        var bookingStatus = getStatusIndicator(booking.status);
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

        /*
        if(booking.tripStatus == 1){
            document.querySelector('.current-booking-item .heading').style.color = '#fff'
            document.querySelector('.current-booking-item .datetime').style.color = '#fff'
            document.querySelector('.current-booking-item .destination').style.color = '#fff'
            document.querySelector('.current-booking-item .seat-number').style.color = '#fff'
        }*/

        document.querySelector('.current-booking-item').addEventListener('click', function () {
            var current = new Date();
            var given =  moment(new Date(booking.departTime), "YYYY-MM-DD HH:mm");
            var duration = moment.duration(given.diff(current)).asHours();

            if((duration - 8) < 0.5){
                // rider cant cancel booking
                getStatusPopup(booking._id == undefined ? booking['bookingID'] : booking._id, booking.status, booking.driver, booking.tripID, booking.email);
            }else{
                if (booking.status === 4) {
                    showSuccessAlertWithConfirmButton(function () {}, 'Ongoing Trip with Driver', 'Enjoy your carpool ride experience', 'Okay') 
                } else {
                    getStatusPopup(booking._id == undefined ? booking['bookingID'] : booking._id, booking.status, booking.driver, booking.tripID, booking.email);
                }
            }
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
                // call from api
                console.log('confirmTripBooking');
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
                localStorage.setItem(DRIVER_BOOKING, null)
                hideActivityIndicator();
                loadMainPage(); 
                //window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
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

function completeTripBooking(bookingID, tripID, userEmail){
    showActivityIndicator();

    var payload = {
        "email": userEmail,
        "bookID": bookingID,
        "tripID": tripID,
        "status": 4
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
                localStorage.setItem(DRIVER_BOOKING, null)
                hideActivityIndicator();
                loadMainPage(); 
                //window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
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
    var landmark = trip.landmark;
    var bookingName = capitalize(drivernameArr[drivernameArr.length - 1])  + ' Ride';

    document.getElementById('on_driver_trip_booking_name').innerHTML = bookingName;
    document.getElementById('on_driver_trip_departure_datetime').innerHTML = capitalize(timeFromNow) + ' ' + timeFromNowFormat;
    document.getElementById('on_driver_trip_location').innerHTML = '<span style=\"font-weight: 700;\">' + landmark + '</span>' + '<br/> ' + '<span style=\"font-size: 0.75rem;\">' + origin + '</span>';
    document.getElementById('on_driver_trip_departure_time').innerHTML = "<span style='font-weight: bold;'>Departure: </span>" + departureTime;
    document.getElementById('on_driver_trip_seat_number').innerHTML = trip.seatCount + '/' + trip.seats;

    if (tripStatus === 1) {
        driver_trip_predeparture_btn.style.display = 'none';
        driver_trip_start_btn.style.display = 'none';
        driver_trip_cancel_btn.style.display = 'none';
        driver_trip_complete_btn.style.display = 'block';
    } else if (tripStatus === 0) {
        // driver_trip_predeparture_btn.style.display = 'block';
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

    search_target_location.value = user_login_data && user_login_data.address && user_login_data.landmark ? user_login_data.landmark + ', ' + user_login_data.address : user_login_data && user_login_data.address ? user_login_data.address : '';
    search_target_location_driver.value = user_login_data && user_login_data.address && user_login_data.landmark ? user_login_data.landmark + ', ' + user_login_data.address : user_login_data && user_login_data.address ? user_login_data.address : '';

    loadFindCreatedTripsHistoryList();

    carpool_on_booking_container.style.display = 'none';
}

function loadDefaultSelectedLocationFields() {
    target_location_region.innerHTML = '<option value="" selected disabled>Select a Region</div>';
    target_location_region.innerHTML += regions.map(function (region, i) {
        if (i === 0) {
            return '<option value=\"' + region + '\">' + location_list[region].region_name + '</option>';
        } else {
            return '<option value=\"' + region + '\">' + location_list[region].region_name + '</option>';
        }
    }).join('');
    target_location_landmark.value = '';
    target_location_province.innerHTML = '';
    target_location_province.innerHTML = '<option value="" selected disabled>Select a Province</div>';
    target_location_barangay.innerHTML = '';
    target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    target_location_municipality.innerHTML = '';
    target_location_municipality.innerHTML = '<option value="" selected disabled>Select a Municipality</div>';
    address_confirm_button.disabled = true;
    address_remove_button.disabled = true;
}

function bookingFromCache(){
    var success = false;
    
    try{
        var localBooking = JSON.parse(localStorage.getItem(DRIVER_BOOKING))
        if(localBooking != null){
            var givenDate = moment(new Date(localBooking.createdAt)).format("YYYY-MM-DD HH:mm");
            var given =  moment(new Date(givenDate), "YYYY-MM-DD HH:mm");
            var duration = moment.duration(given.diff(new Date())).asHours();
            duration = duration - 8;

            // one minute local storage life
            if(duration < _cacheExpiry){
                success = false;
            }else{
                if (localBooking.data.status === 0 || localBooking.data.status === 1 || localBooking.data.status === 4) {
                    console.log('from booking cache');
                    //getRiderBookingsStatusAPI(localBooking.data)
                    success = true;
                }
            }
        }
    }catch(e){
        success = false;
    }
    
    return success;
}

function tripFromCache(){
    var success = false;
    
    try{
        var localTrip = JSON.parse(localStorage.getItem(DRIVER_TRIP))
        if(localTrip != null){
            var givenDate = moment(new Date(localTrip.createdAt)).format("YYYY-MM-DD HH:mm");
            var given =  moment(new Date(givenDate), "YYYY-MM-DD HH:mm");
            var duration = moment.duration(given.diff(new Date())).asHours();
            duration = duration - 8;

            // one minute local storage life
            if(duration < _cacheExpiry){
                success = false;
            }else{
                console.log('from trip cache');
                //getDriverTripSessionAPI(localTrip.data);
                success = true;
            }
        }
    }catch(e){
        success = false;
    } 
    
    return success;
}

function reloadCurrentPage(fromApi) {
    showActivityIndicator();

    delay(function () {
        if(fromApi){
            driver_pool_results_container.innerHTML = '';
            console.log('loading from api');
            
            // check profile if there is an ongoing booking or trip
            var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email.toLowerCase();
            JUANDERSERVICE.userStatusCheck(email)
            .then(getResJSON)
            .then(function (data) {
                var currect_app_version_from_server = data.version;
                var current_app_version = localStorage.getItem(CURRENT_APP_VERSION_KEY) ;
    
                if (currect_app_version_from_server && !current_app_version) {
                    localStorage.setItem(CURRENT_APP_VERSION_KEY, currect_app_version_from_server);
                } else if (currect_app_version_from_server && (currect_app_version_from_server === parseInt(current_app_version))) {
                    
                } else {
                    localStorage.removeItem(CURRENT_APP_VERSION_KEY);
                    localStorage.removeItem(USER_LOGIN_DATA_KEY);
                    moveToLoginPage()
                }
                // console.log('begin', data)
                if (!JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).landmark) {
                    hideMainTopNavbar();
                    hideMainBottomNavbar();
                    hideActivityIndicator();
                    carpool_container.style.display = 'none';
                    update_new_address_container.style.display = 'block';

                    new_target_location_region.innerHTML = '<option value="" selected disabled>Select a Region</div>';
                    new_target_location_region.innerHTML += regions.map(function (region, i) {
                        return '<option value=\"' + region + '\">' + location_list[region].region_name + '</option>';
                    }).join('');
                    new_target_location_landmark.value = '';
                    new_target_location_province.innerHTML = '';
                    new_target_location_province.innerHTML = '<option value="" selected disabled>Select a Province</div>';
                    new_target_location_barangay.innerHTML = '';
                    new_target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
                    new_target_location_municipality.innerHTML = '';
                    new_target_location_municipality.innerHTML = '<option value="" selected disabled>Select a Municipality</div>';
                    address_confirm_button.disabled = true;
                } else {
                    carpool_container.style.display = 'block';
                    update_new_address_container.style.display = 'none';

                    showMainBottomNavbar();
                    showMainTopNavbar();

                    if(data['trip'] == null && data['booking'] == null){
                        hideActivityIndicator();
                            loadMainPage();  
                        // Check if there is data in the localstorage and if time elapse is less than 3 minutes
                        var localTrip = JSON.parse(localStorage.getItem(DRIVER_TRIP))
                        var localBooking = JSON.parse(localStorage.getItem(DRIVER_BOOKING))
        
                        if(localTrip == null && localBooking == null){
                            localStorage.setItem(DRIVER_TRIP, null)
                            localStorage.setItem(DRIVER_BOOKING, null)
                            hideActivityIndicator();
                            loadMainPage();  
                        }else{
                            if(localTrip != null){
                                console.log('check duration trip')
                                getDriverTripSessionAPI(localTrip.data);
                            }else if(localBooking != null){
                                console.log('check duration booking')
                                // console.log(localBooking.data.status)
                                if (localBooking.data.status === 0 || localBooking.data.status === 1 || localBooking.data.status === 3) {
                                    
                                    var localBookingObj = {
                                        data: localBooking.data,
                                        createdAt: DATETIMESERVICE.getDateTime()
                                    }
                                    console.log('shall pass')
                                    localStorage.setItem(DRIVER_BOOKING, JSON.stringify(localBookingObj))
                                    getRiderBookingsStatusAPI(localBooking)
                                }
                            }
                        }
                    } else if(data['trip'] != null && data['booking'] != null){
                        console.error('user can only either have 1 trip or 1 booking');
                        hideActivityIndicator();
                        showErrorAlertWithConfirmButton(function () {
                            window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                        }, 'Error 500', 'User can only either have 1 trip or 1 booking', 'Refresh');
                    }
        
                    if(data['trip'] != null){
                        var localTripObj = {
                            data: data['trip'],
                            createdAt: DATETIMESERVICE.getDateTime()
                        }
        
                        localStorage.setItem(DRIVER_TRIP, JSON.stringify(localTripObj))
                        getDriverTripSessionAPI(data['trip']);
                    }
        
                    if(data['booking'] != null){
                        if (data['booking'].status === 0 || data['booking'].status === 1 || data['booking'].status === 3) {
                            var localBookingObj = {
                                data: data['booking'],
                                createdAt: DATETIMESERVICE.getDateTime()
                            }
        
                            localStorage.setItem(DRIVER_BOOKING, JSON.stringify(localBookingObj))
                            getRiderBookingsStatusAPI(data['booking'])
                        } else {
                            localStorage.setItem(DRIVER_BOOKING, null)
                            hideActivityIndicator();
                            loadMainPage();
                        }
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
        }
    }, DELAY_TIME_IN_MILLISECONDS);
}

function moveToLoginPage() {
    // Clear local storage
    localStorage.clear();
    window.location.href = HOMEPAGE_SOURCE_LOCATION;
}

function onBackToPreviousPage() {
    driver_stops = [];
    address_field_change_button_group.innerHTML = "";
    reloadCurrentPage(true);
}

back_to_previous_page_button.addEventListener('click', onBackToPreviousPage);


/** FIND CARPOOL */
var find_carpool_navigate_container = document.getElementById('find_carpool_navigate_container');
var driver_pool_results_container = document.getElementById('driver_pool_results_container');
var carpool_on_trip_container = document.getElementById('carpool_on_trip_container');

var show_confirm_carpool_rider = document.getElementById('show_confirm_carpool_rider');
var search_target_location = document.getElementById('search_target_location');

var more_carpool_buttons = document.getElementById('more_carpool_buttons');

var trip_completed_button = document.getElementById('trip_completed_button');
var join_pool_rider_button = document.getElementById('join_pool_rider_button');

function getCarpoolRideList() {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var pointA = find_carpool_search_key;
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
            // hideActivityIndicator();
            join_pool_rider_button.disabled = false;

            if (data) {
                console.log('loadCarpoolOnTripScreen'); 
                localStorage.setItem(DRIVER_BOOKING, JSON.stringify(data));
                var localBooking = JSON.parse(localStorage.getItem(DRIVER_BOOKING))
                if (localBooking.status === 0 || localBooking.status === 1 || localBooking.status === 4) {
                    var localBookingObj = {
                        data: localBooking,
                        createdAt: DATETIMESERVICE.getDateTime()
                    }
                    
                    localStorage.setItem(DRIVER_BOOKING, JSON.stringify(localBookingObj))
                    getRiderBookingsStatusAPI(localBooking)
                }
                // window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
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
function findCarppolFromHistory(e) {
    var element = e.id.split('_');
    var _id = element[element.length - 1];
    var created_trips_history = localStorage.getItem(CREATED_TRIPS_HISTORY_LIST) ? JSON.parse(localStorage.getItem(CREATED_TRIPS_HISTORY_LIST)) : null;

    if(created_trips_history) {
        find_carpool_search_key = created_trips_history[_id].landmark + ', ' + created_trips_history[_id].address;
        onFindCarpoolRide();
    }
}
function shareCarppolFromHistory(e) {
    var element = e.id.split('_');
    var _id = element[element.length - 1];
    var created_trips_history = localStorage.getItem(CREATED_TRIPS_HISTORY_LIST) ? JSON.parse(localStorage.getItem(CREATED_TRIPS_HISTORY_LIST)) : null;

    if(created_trips_history) {
        share_carpool_search_key = created_trips_history[_id].landmark + ', ' + created_trips_history[_id].address;
        onMoreShareRide();
    }
}
function loadFindCreatedTripsHistoryList() {
    var created_trips_history = localStorage.getItem(CREATED_TRIPS_HISTORY_LIST) ? JSON.parse(localStorage.getItem(CREATED_TRIPS_HISTORY_LIST)) : null;

    if (created_trips_history) {
        find_carpool_address_list.innerHTML = '';
        find_carpool_address_list.innerHTML = created_trips_history.map(function (trip, i) {
            return '<div class=\"col-12\" style=\"border-bottom: 1px solid #F1F0F0;\">' +
                        '<button type=\"button\" class=\"btn btn-outline address-field-change-button d-flex flex-row align-items-center\" id=\"find_carpool_address_' + i + '\" onclick=\"findCarppolFromHistory(this)\">' +
                            '<span class=\"icon\"><i class=\"fa-solid fa-location-dot\"></i></span>' +
                            '<span class=\"details\">' +
                                '<span class=\"landmark-label\" id=\"landmark_label\">' + trip.landmark + '</span>' +
                                '<span class=\"address-label\" id=\"address_label\">' + trip.address + '</span>' +
                            '</span>' +
                            '<span class=\"icon\"><i class=\"fa-solid fa-arrow-right\"></i></span>' +
                        '</button>' +
                    '</div>';
        }).join('');
    } else {
        find_carpool_address_list.innerHTML = '<p class=\"absolute-center\">No created trips yet</p>';;
    }
}

function loadShareCreatedTripsHistoryList() {
    var created_trips_history = localStorage.getItem(CREATED_TRIPS_HISTORY_LIST) ? JSON.parse(localStorage.getItem(CREATED_TRIPS_HISTORY_LIST)) : null;

    if (created_trips_history) {
        share_carpool_address_list.innerHTML = '';
        share_carpool_address_list.innerHTML = created_trips_history.map(function (trip, i) {
            return '<div class=\"col-12\" style=\"border-bottom: 1px solid #F1F0F0;\">' +
                        '<button type=\"button\" class=\"btn btn-outline address-field-change-button d-flex flex-row align-items-center\" id=\"share_carpool_address_' + i + '\" onclick=\"shareCarppolFromHistory(this)\">' +
                            '<span class=\"icon\"><i class=\"fa-solid fa-location-dot\"></i></span>' +
                            '<span class=\"details\">' +
                                '<span class=\"landmark-label\" id=\"landmark_label\">' + trip.landmark + '</span>' +
                                '<span class=\"address-label\" id=\"address_label\">' + trip.address + '</span>' +
                            '</span>' +
                            '<span class=\"icon\"><i class=\"fa-solid fa-arrow-right\"></i></span>' +
                        '</button>' +
                    '</div>';
        }).join('');
    } else {
        share_carpool_address_list.innerHTML = '<p class=\"absolute-center\">No created trips yet</p>';
    }
}

function onCarpoolRidelist () {
    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

    if (share_a_ride_button.classList.contains('active-tab-button')) {
        share_a_ride_button.classList.remove('active-tab-button');
    }

    search_target_location.value = user_login_data && user_login_data.address && user_login_data.landmark ? user_login_data.landmark + ', ' + user_login_data.address : user_login_data && user_login_data.address ? user_login_data.address : '';

    loadFindCreatedTripsHistoryList();

    carpool_ride_list_button.classList.add('active-tab-button');
    showCarpoolRideListContainer();
    showFindCarpoolNavigateContainer();
}
function onFindCarpoolRide () {
    // Check if there is an existing shuttle booking
    var localBooking = JSON.parse(localStorage.getItem(DRIVER_BOOKING))
    if(localBooking != null){
        showErrorAlertWithConfirmButton(function () {}, 'Error', 'You have an existing shuttle booking', 'Ok');
    }else{
        showActivityIndicator();
        showSecondaryTopNavbar();
        hideMoreCarpoolButtonsContainer();
        hideMainBottomNavbar();
        getCarpoolRideList();
    }
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

carpool_ride_list_button.addEventListener('click', onCarpoolRidelist);

search_target_location.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        find_carpool_search_key = event.target.value;
        onFindCarpoolRide();
    }
});


/** SHARE-A-RIDE */
var share_ride_navigate_container = document.getElementById('share_ride_navigate_container');
var share_ride_navigate_container = document.getElementById('share_ride_navigate_container');
var create_trip_container = document.getElementById('create_trip_container');
var on_trip_driver_container = document.getElementById('on_trip_driver_container');

var search_target_location_driver = document.getElementById('search_target_location_driver');
var driver_available_seats = document.getElementById('driver_available_seats');
var driver_contact_no = document.getElementById('driver_contact_no');
var departure_date_picker = document.getElementById('departure_date_picker');
var departure_date = document.getElementById('departure_date');
var departure_time_picker = document.getElementById('departure_time_picker');
var departure_time = document.getElementById('departure_time');

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
    var target_location = driver_stops[0].address;
    var landmark = driver_stops[0].landmark;
    var points = driver_stops.filter(function (stop, i) {
        return i !== 0;
    });
    var available_seats = driver_available_seats.value ? driver_available_seats.value : 0;
    var departure_datetime = moment(departure_date.value + ' ' + departure_time.value).format("YYYY-MM-DDTHH:mm") + ':00.000Z';
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
        "departTime": departure_datetime,
        "landmark": landmark,
        "points": points
    };
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };
    var created_trips_history = localStorage.getItem(CREATED_TRIPS_HISTORY_LIST) ? JSON.parse(localStorage.getItem(CREATED_TRIPS_HISTORY_LIST)) : null;

    if (created_trips_history) {
        var checkForDuplicates = created_trips_history.findIndex(function (trip) {
            var combined = trip.landmark + ', ' + trip.address;
            var currentTrip = driver_stops[0].landmark + ', ' + driver_stops[0].address;
            return combined.toLowerCase() === currentTrip.toLowerCase();
        });

        if (checkForDuplicates < 0) {
            created_trips_history.push(driver_stops[0]);
            localStorage.setItem(CREATED_TRIPS_HISTORY_LIST, JSON.stringify(created_trips_history));
        }
    } else {
        var arr = [];
        arr.push(driver_stops[0])
        localStorage.setItem(CREATED_TRIPS_HISTORY_LIST, JSON.stringify(arr));
    }

    fetch(CREATE_TRIP_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
        
            //var localTripObj = {
            //    data: data,
            //    createdAt: DATETIMESERVICE.getDateTime()
            //}
            //localStorage.setItem(DRIVER_TRIP, JSON.stringify(localTripObj));
            hideActivityIndicator();
            create_trip_container.querySelector('form').style.display = 'block';
            showSuccessAlertWithConfirmButton(function () {
                console.log('create trip');
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Trip has been created', '', 'Done');
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            create_trip_container.querySelector('form').style.display = 'block';
            showErrorAlertWithConfirmButton(function () {
                target_location_region.disabled = false;
                target_location_province.disabled = false;
                target_location_municipality.disabled = false;
                target_location_barangay.disabled = false;
                driver_available_seats.disabled = false;
                departure_date_picker.disabled = false;
                departure_time_picker.disabled = false;
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
                console.log('cancel trip');
                localStorage.removeItem(DRIVER_TRIP_STATUS_KEY);
                localStorage.setItem(DRIVER_TRIP, null);
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
                console.log('complete trip')
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
function updateUserInfo(account_id, landmark, location, data) {
    var payload = {
        landmark: landmark,
        address: location,
        lat: data.lat ? data.lat : '',
        lng: data.lng ? data.lng : '',
        kmZero: data.kmZero ? data.kmZero : ''
    };
    var options = {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    };

    fetch(UPDATE_USER_INFO_API_ENPOINT + '/' + account_id, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                if (data.code === 400) {
                    hideActivityIndicator();
                    showErrorAlertWithConfirmButton(function () {
                        new_target_location_landmark.disabled = false;
                        new_target_location_region.disabled = false;
                        new_target_location_province.disabled = false;
                        new_target_location_municipality.disabled = false;
                        new_target_location_barangay.disabled = false;
                        new_address_confirm_button.disabled = false;
                    }, 'Error 400', 'Account update failed', 'Done');
                } else {
                    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

                    user_login_data.address = location;
                    user_login_data.landmark = landmark;

                    localStorage.setItem(USER_LOGIN_DATA_KEY, JSON.stringify(user_login_data));

                    hideActivityIndicator();
                    showSuccessAlertWithConfirmButton(function () {
                        window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                    }, 'Account Updated Successfully', '', 'Done');
                }
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function getUser(landmark, location, d) {
    fetch(GET_USER_API_ENDPOINT + '/' + JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                var account_id = data._id;
                updateUserInfo(account_id, landmark, location, d);
            }, 1000);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function checkAddress(landmark, location) {
    var payload = {
        address: location,
        landmark: landmark
    }
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(CHECK_ADDRESS_API_ENDPONT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                hideActivityIndicator();

                if (data.code === 400) {
                    showErrorAlertWithConfirmButton(function () {
                        target_location_landmark.disabled = false;
                        target_location_region.disabled = false;
                        target_location_province.disabled = false;
                        target_location_municipality.disabled = false;
                        target_location_barangay.disabled = false;
                        address_confirm_button.disabled = false;
                        address_remove_button.disabled = false;
                    }, 'Error 404', 'No location found with address provided', 'Done');
                } else {

                    if (is_new_driver_stop) {
                        driver_stops.push({
                            landmark: landmark,
                            address: location
                        });
                        is_new_driver_stop = false;
                    } else {
                        driver_stops[target_location_id.value].landmark = landmark;
                        driver_stops[target_location_id.value].address = location;
                        is_new_driver_stop = false;
                    }

                    loadAdressFields(driver_stops);
                    onCreateTripRequiredFields();
                }
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
function checkNewAddress(landmark, location) {
    var payload = {
        address: location,
        landmark: landmark
    }
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(CHECK_ADDRESS_API_ENDPONT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                if (data.code === 400) {
                    hideActivityIndicator();
                    showErrorAlertWithConfirmButton(function () {
                        new_target_location_landmark.disabled = false;
                        new_target_location_region.disabled = false;
                        new_target_location_province.disabled = false;
                        new_target_location_municipality.disabled = false;
                        new_target_location_barangay.disabled = false;
                        new_address_confirm_button.disabled = false;
                    }, 'Error 404', 'No location found with address provided', 'Done');
                } else {
                    getUser(landmark, location, data);
                }
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
function loadAdressFields (driver_stops) {
    add_new_stops_button.style.display = driver_stops.length <= 2 ? 'block' : 'none';
    address_field_change_button_group.innerHTML = "";
    address_field_change_button_group.innerHTML = driver_stops.map(function (stop, i) {
        return '<button type=\"button\" class=\"btn btn-outline address-field-change-button d-flex flex-row align-items-center\" id=\"address_field_' + i +'\" data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdrop\" onclick=\"selectAddressField(this)\">' + 
                    '<span class=\"icon\"><i class=\"fa-solid fa-location-dot\"></i></span>' +
                    '<span class=\"details\">' +
                        '<span class=\"landmark-label\" id=\"landmark_label\"' + 'style=\"color:' + (stop.landmark ? '#212529' : '#cccccc') +';\"' +'>' + (stop.landmark ? stop.landmark : 'No Landmark') + '</span>' +
                        '<span class=\"address-label\" id=\"address_label\">' + (stop.address ? stop.address : 'Region, province, municipality, barangay') + '</span>' +
                    '</span>' +
                    '<span class=\"icon\"><i class=\"fa-solid fa-arrow-right\"></i></span>' +
                '</button>';
    }).join('');
}

function onSelectedRegion (selectedRegion) {
    var provinces = Object.keys(location_list[selectedRegion].province_list);

    target_location_province.innerHTML = '';
    target_location_province.innerHTML = '<option value="" disabled>Select a Province</div>';
    target_location_province.innerHTML += provinces.map(function (province) {
        return '<option value=\"' + capitalizeWords(province) + '\">' + capitalizeWords(province) + '</option>';
    }).join('');
}

function onSelectedProvince (selectedRegion, selectedProvince) {
    var municipalities = Object.keys(location_list[selectedRegion].province_list[selectedProvince.toUpperCase()].municipality_list);

    target_location_municipality.innerHTML = '';
    target_location_municipality.innerHTML = '<option value="" disabled>Select a Municipality</div>';
    target_location_municipality.innerHTML += municipalities.map(function (municipality) {
        return '<option value=\"' + capitalizeWords(municipality) + '\">' + capitalizeWords(municipality) + '</option>';
    }).join('');
}

function onSelectedMunicipality (selectedRegion, selectedProvince, selectedMunicipality) {
    var barangay =location_list[selectedRegion].province_list[selectedProvince.toUpperCase()].municipality_list[selectedMunicipality.toUpperCase()].barangay_list;

    target_location_barangay.innerHTML = '';
    target_location_barangay.innerHTML = '<option value=""  disabled>Select a Barangay</div>';
    target_location_barangay.innerHTML += barangay.map(function (barangay) {
        return '<option value=\"' + capitalizeWords(barangay) + '\">' + capitalizeWords(barangay) + '</option>';
    }).join('');
}

function enableAddressConfirmButton () {
    address_confirm_button.disabled = target_location_landmark.value.length && target_location_region.value && target_location_province.value && target_location_municipality.value && target_location_barangay.value ? false : true;
    address_remove_button.disabled = target_location_landmark.value.length && target_location_region.value && target_location_province.value && target_location_municipality.value && target_location_barangay.value ? false : true;
}

function enableNewAddressConfirmButton () {
    new_address_confirm_button.disabled = new_target_location_landmark.value.length && new_target_location_region.value && new_target_location_province.value && new_target_location_municipality.value && new_target_location_barangay.value ? false : true;
}

function selectAddressField(e) {
    var element = e.id.split('_');
    var _id = element[element.length - 1];
    var targetLocation = driver_stops[_id];
    var landmark = targetLocation ? targetLocation.landmark : '';
    var location = targetLocation ? targetLocation.address.split(', ') : '';

    target_location_landmark.value = landmark;
    target_location_id.value = _id;

    address_remove_button.style.display = driver_stops.length > 1 && parseInt(_id) !== 0 ? 'block' : 'none';

    if (location && location.length > 3) {
        target_location_region.innerHTML = '<option value="" disabled>Select a Region</div>';
        target_location_region.innerHTML += regions.map(function (region, i) {
            return '<option value=\"' + region + '\">' + location_list[region].region_name + '</option>';
        }).join('');

        onSelectedRegion(location[0]);
        onSelectedProvince(location[0], location[1]);
        onSelectedMunicipality (location[0], location[1], location[2]);

        target_location_region.value = location[0];
        target_location_province.value = location[1];
        target_location_municipality.value = location[2];
        target_location_barangay.value = location[3];

        enableAddressConfirmButton();
    } else {
        loadDefaultSelectedLocationFields();
    }
}

function onShareCarpoolRide () {
    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

    if (carpool_ride_list_button.classList.contains('active-tab-button')) {
        carpool_ride_list_button.classList.remove('active-tab-button');
    }

    search_target_location_driver.value = user_login_data && user_login_data.address && user_login_data.landmark ? user_login_data.landmark + ', ' + user_login_data.address : user_login_data && user_login_data.address ? user_login_data.address : '';

    loadShareCreatedTripsHistoryList();

    share_a_ride_button.classList.add('active-tab-button');
    showShareARideContainer();
    showShareRideNavigateContainer();
}
function onMoreShareRide() {
    // check if there is an existing shuttle booking
    var localBooking = JSON.parse(localStorage.getItem(DRIVER_BOOKING))
    if(localBooking != null){
        showErrorAlertWithConfirmButton(function () {}, 'Error', 'You have an existing shuttle booking', 'Ok');
    }else{
        var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

        showSecondaryTopNavbar();
        hideMoreCarpoolButtonsContainer();
        hideMainBottomNavbar();
        showCreateTripContainer();

        var target_location = share_carpool_search_key;

        driver_stops.push({
            landmark: target_location.split(', ').length > 4 ? target_location.split(', ')[0] : JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).landmark ? JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).landmark : '',
            address: target_location.split(', ').length > 4 ? target_location.split(', ').filter(function(target, i) { return i != 0; }).join(', ') : JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).address ? JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).address : '',
        });

        loadAdressFields(driver_stops);

        new Cleave(driver_contact_no, {
            numericOnly: true,
            blocks: [0, 3, 3, 4],
            delimiters: ['', ' ', ' ']
        });

        create_trip_button.disabled = true;
        driver_available_seats.value = '';
        driver_contact_no.value = user_login_data && user_login_data.mobileNumber ? user_login_data.mobileNumber : '';

        let defaultDate = moment(new Date());
        departure_date.value = defaultDate.format("YYYY-MM-DD");

        new Rolldate({
            el: '#departure_date_picker',
            format: 'MM/DD/YYYY',
            beginYear: new Date().getFullYear(),
            lang: {
                title: 'Select date',
                cancel: 'cancel',
                confirm: 'confirm',
                year: '',
                month: '',
                day: '',
                hour: '',
                min: '',
                sec: ''
            },
            value: defaultDate.format("MM/DD/YYYY"),
            confirm: function(date) {
                departure_date.value = moment(new Date(date)).format("YYYY-MM-DD");
            }
        });

        let defaultTime = defaultDate.format("H:mm");
        departure_time.value = defaultTime;
        new Rolldate({
            el: '#departure_time_picker',
            format: 'hh:mm',
            minStep: 5,
            lang: {
                title: 'Select time',
                cancel: 'cancel',
                confirm: 'confirm',
                year: '',
                month: '',
                day: '',
                hour: '',
                min: '',
                sec: ''
            },
            value: defaultTime,
            confirm: function(date) {
                departure_time.value = date;
            }
        });

    }
}
function onCreateTrip() {
    var givenDate = moment(departure_date.value + ' ' + departure_time.value, "YYYY-MM-DD HH:mm");

    var current = new Date();

    var numberPattern = /([0-9])/g;
    var phonePattern = /(9[0-9]{2}\s([0-9]{3}\s)[0-9]{4})/;

    var isAllNumeric = numberPattern.test(driver_available_seats.value) && numberPattern.test(driver_contact_no.value.replace(/\s/g, ''));
    var inPhoneFormat = phonePattern.test(driver_contact_no.value);

    var duration = moment.duration(givenDate.diff(current)).asHours();

    var isValidDepartureDateTime = givenDate.isValid();
    var isWithinScopeDuration = duration >= 0.5 && duration <= 5 ? true : false;

    var isSeatMaxLength = parseInt(driver_available_seats.value) > 0 && parseInt(driver_available_seats.value) <= 30;

    if (!isAllNumeric) {
        showErrorAlert('Invalid number format', 'Seat Number should numbers (0 to 9)');
    } else if (!inPhoneFormat) {
        showErrorAlert('Invalid phone number format', 'Phone number should be in this format: 9xx xxx xxxx or 9xxxxxxxxx');
    } else if (!isSeatMaxLength) {
        showErrorAlert('Invalid seat number', 'Seat numbers can be only up to 30');
    } else if (!isWithinScopeDuration || !isValidDepartureDateTime) {
        showErrorAlert('Invalid departure time', 'Departure must be set at least 30 minutes up to 5 hours from current date and time');
    } else {
        showQuestionAlertWithButtons(function () {
            target_location_region.disabled = true;
            target_location_province.disabled = true;
            target_location_municipality.disabled = true;
            target_location_barangay.disabled = true;
            driver_available_seats.disabled = true;
            departure_date_picker.disabled = true;
            departure_time_picker.disabled = true;
            driver_contact_no.disabled = true;
            create_trip_button.disabled = true;
            create_trip_container.querySelector('form').style.display = 'none';
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
function onCreateTripRequiredFields() {
    var validAddressFields = driver_stops.filter(function (stop) {
                                return stop.address && stop.landmark;
                            }).length === driver_stops.length;

    var requiredFields = driver_available_seats.value !== "" &
                            departure_date.value.length > 0 &
                            departure_time.value.length > 0 &
                            driver_contact_no.value.length > 0 & validAddressFields;

    if (requiredFields === 1) {
        create_trip_button.disabled = false;
    } else {
        create_trip_button.disabled = true;
    }
}

function onSelectRegion (selectedRegion) {
    var provinces = Object.keys(location_list[selectedRegion].province_list);

    target_location_province.innerHTML = '';
    target_location_province.innerHTML = '<option value="" selected disabled>Select a Province</div>';
    target_location_barangay.innerHTML = '';
    target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    target_location_municipality.innerHTML = '';
    target_location_municipality.innerHTML = '<option value="" selected disabled>Select a Municipality</div>';
    target_location_province.innerHTML += provinces.map(function (province) {
        return '<option value=\"' + capitalizeWords(province) + '\">' + capitalizeWords(province) + '</option>';
    }).join('');
}

function onSelectProvince (selectedRegion, selectedProvince) {
    var municipalities = Object.keys(location_list[selectedRegion].province_list[selectedProvince.toUpperCase()].municipality_list);

    target_location_municipality.innerHTML = '';
    target_location_municipality.innerHTML = '<option value="" selected disabled>Select a Municipality</div>';
    target_location_barangay.innerHTML = '';
    target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    target_location_municipality.innerHTML += municipalities.map(function (municipality) {
        return '<option value=\"' + capitalizeWords(municipality) + '\">' + capitalizeWords(municipality) + '</option>';
    }).join('');
}

function onSelectMunicipality (selectedRegion, selectedProvince, selectedMunicipality) {
    var barangay =location_list[selectedRegion].province_list[selectedProvince.toUpperCase()].municipality_list[selectedMunicipality.toUpperCase()].barangay_list;

    target_location_barangay.innerHTML = '';
    target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    target_location_barangay.innerHTML += barangay.map(function (barangay) {
        return '<option value=\"' + capitalizeWords(barangay) + '\">' + capitalizeWords(barangay) + '</option>';
    }).join('');
}
function onSelectNewRegion (selectedRegion) {
    var provinces = Object.keys(location_list[selectedRegion].province_list);

    new_target_location_province.innerHTML = '';
    new_target_location_province.innerHTML = '<option value="" selected disabled>Select a Province</div>';
    new_target_location_barangay.innerHTML = '';
    new_target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    new_target_location_municipality.innerHTML = '';
    new_target_location_municipality.innerHTML = '<option value="" selected disabled>Select a Municipality</div>';
    new_target_location_province.innerHTML += provinces.map(function (province) {
        return '<option value=\"' + capitalizeWords(province) + '\">' + capitalizeWords(province) + '</option>';
    }).join('');
}

function onSelectNewProvince (selectedRegion, selectedProvince) {
    var municipalities = Object.keys(location_list[selectedRegion].province_list[selectedProvince.toUpperCase()].municipality_list);

    new_target_location_municipality.innerHTML = '';
    new_target_location_municipality.innerHTML = '<option value="" selected disabled>Select a Municipality</div>';
    new_target_location_barangay.innerHTML = '';
    new_target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    new_target_location_municipality.innerHTML += municipalities.map(function (municipality) {
        return '<option value=\"' + capitalizeWords(municipality) + '\">' + capitalizeWords(municipality) + '</option>';
    }).join('');
}

function onSelectNewMunicipality (selectedRegion, selectedProvince, selectedMunicipality) {
    var barangay =location_list[selectedRegion].province_list[selectedProvince.toUpperCase()].municipality_list[selectedMunicipality.toUpperCase()].barangay_list;

    new_target_location_barangay.innerHTML = '';
    new_target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    new_target_location_barangay.innerHTML += barangay.map(function (barangay) {
        return '<option value=\"' + capitalizeWords(barangay) + '\">' + capitalizeWords(barangay) + '</option>';
    }).join('');
}

share_a_ride_button.addEventListener('click', onShareCarpoolRide);
create_trip_button.addEventListener('click', onCreateTrip);
driver_available_seats.addEventListener('change', onCreateTripRequiredFields);
departure_date_picker.addEventListener('change', onCreateTripRequiredFields);
departure_time_picker.addEventListener('change', onCreateTripRequiredFields);
driver_contact_no.addEventListener('keyup', onCreateTripRequiredFields);

search_target_location_driver.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        share_carpool_search_key = event.target.value;
        onMoreShareRide();
    }
});

add_new_stops_button.addEventListener('click', function () {
    is_new_driver_stop = true;
    address_remove_button.style.display = 'none';
    loadDefaultSelectedLocationFields();
});

address_confirm_button.addEventListener('click', function () {
    var landmark = target_location_landmark.value;
    var address = target_location_region.value + ', ' + target_location_province.value + ', ' + target_location_municipality.value + ', ' + target_location_barangay.value;

    showActivityIndicator();
    checkAddress(landmark, address);
});

address_remove_button.addEventListener('click', function () {
    var _id = target_location_id.value;

    if (!is_new_driver_stop) {
        driver_stops = driver_stops.filter(function (stop, i) {
            return i !== parseInt(_id);
        });

        is_new_driver_stop = false;
    }

    loadAdressFields(driver_stops);
});

target_location_region.addEventListener('change', function (e) {
    onSelectRegion (e.target.value);

    if (target_location_province.value) {
        onSelectProvince(e.target.value, target_location_province.value);
    }

    if (target_location_province.value && target_location_municipality.value) {
        onSelectMunicipality(e.target.value, target_location_province.value, target_location_municipality.value);
    }

    enableAddressConfirmButton();
});

target_location_province.addEventListener('change', function (e) {
    onSelectProvince(target_location_region.value, e.target.value);

    if (target_location_region.value && target_location_municipality.value) {
        onSelectMunicipality(target_location_region.value, e.target.value, target_location_municipality.value);
    }

    enableAddressConfirmButton();
});

target_location_municipality.addEventListener('change', function (e) {
    if (target_location_region.value && target_location_province.value) {
        onSelectMunicipality(target_location_region.value, target_location_province.value, e.target.value);
    }

    enableAddressConfirmButton();
});

target_location_barangay.addEventListener('change', function () {
    enableAddressConfirmButton();
});

target_location_landmark.addEventListener('keyup', function () {
    enableAddressConfirmButton();
});

address_close_button.addEventListener('click', function () {
    is_new_driver_stop = false;
    loadDefaultSelectedLocationFields();
    add_new_stops_button.style.display = driver_stops.length < 3 ? 'block' : 'none';
});

new_target_location_region.addEventListener('change', function (e) {
    onSelectNewRegion (e.target.value);

    if (new_target_location_province.value) {
        onSelectNewProvince(e.target.value, new_target_location_province.value);
    }

    if (new_target_location_province.value && new_target_location_municipality.value) {
        onSelectNewMunicipality(e.target.value, new_target_location_province.value, new_target_location_municipality.value);
    }

    enableNewAddressConfirmButton();
});

new_target_location_province.addEventListener('change', function (e) {
    onSelectNewProvince(new_target_location_region.value, e.target.value);

    if (new_target_location_region.value && new_target_location_municipality.value) {
        onSelectNewMunicipality(new_target_location_region.value, e.target.value, new_target_location_municipality.value);
    }

    enableNewAddressConfirmButton();
});

new_target_location_municipality.addEventListener('change', function (e) {
    if (new_target_location_region.value && new_target_location_province.value) {
        onSelectNewMunicipality(new_target_location_region.value, new_target_location_province.value, e.target.value);
    }

    enableNewAddressConfirmButton();
});

new_target_location_barangay.addEventListener('change', function () {
    enableNewAddressConfirmButton();
});

new_target_location_landmark.addEventListener('keyup', function () {
    enableNewAddressConfirmButton();
});

new_address_confirm_button.addEventListener('click', function () {
    var landmark = new_target_location_landmark.value;
    var address = new_target_location_region.value + ', ' + new_target_location_province.value + ', ' + new_target_location_municipality.value + ', ' + new_target_location_barangay.value;

    showActivityIndicator();

    new_target_location_landmark.disabled = true;
    new_target_location_region.disabled = true;
    new_target_location_province.disabled = true;
    new_target_location_municipality.disabled = true;
    new_target_location_barangay.disabled = true;
    new_address_confirm_button.disabled = true;

    checkNewAddress(landmark, address);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.carpool-page-container').style.display = 'none';
    showActivityIndicator();

    if (checkCurrentSession()) {
        // console.log('booking', bookingFromCache())
        // console.log('trip', tripFromCache())
        reloadCurrentPage(true);
        
    } else {
        moveToLoginPage();
        localStorage.removeItem(CURRENT_APP_VERSION_KEY);
    }
});