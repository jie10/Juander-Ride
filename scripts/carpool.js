/** LOCAL STORAGE */
var USER_LOGIN_DATA_KEY = 'user_login_data';
var DRIVER_TRIP_STATUS_KEY = 'driver_trip_status';
var DRIVER_TRIP = 'driver_trip';
var DRIVER_BOOKING = 'user_booking';
var USER_DATA_TRIP_CHECK = 'user_data_trip_check';
var USER_DATA_BOOKING_CHECK = 'user_data_booking_check';
var CURRENT_APP_VERSION_KEY = 'current_app_version';
var USER_LOGIN_DATA_KEY = 'user_login_data';
var CREATED_TRIPS_HISTORY_LIST = 'created_trips_history_list';
var SAVED_BOOKINGS_HISTORY_LIST = 'saved_bookings_history_list';
var NEW_FEATURES_LOADED_KEY = 'is_new_features_loaded';
var USER_BOOKING_KEY = 'user_booking';
var DRIVER_TRIP_KEY = 'driver_trip';
var SHUTTLE_TRIPS_KEY = 'shuttle_trips';
var SHUTTLE_BOOKING_KEY = 'shuttle_booking';
var IS_ADVERTISEMENTS_LOADED_KEY = 'is_advertisements_loaded';

/** CONSTANT VALUES */
var _AES = 'technologyandinnovations';
var DELAY_TIME_IN_MILLISECONDS = 1000;
var regions = Object.keys(location_list);
var MS_TEAMS_SEND_MESSAGE_TO_USER_LINK_URL = 'https://teams.microsoft.com/l/chat/0/0?users=';
var PHONE_CALL_TO_USER_LINK_URL = 'tel:+';
var driver_stops = [];
var is_new_driver_stop = false;
var find_carpool_search_key;
var share_carpool_search_key;
var current_trips = [];
var pending_riders_count;
var latest_driver_trip_datetime;

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
var TRIP_BOOKING_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip/book';
var USER_STATUS_CHECK_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/check';
var POST_DRIVER_TRIPS_PREDEPARTURE_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/messaging';
var CHECK_ADDRESS_API_ENDPONT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/address';
var GET_USER_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/profile';
var UPDATE_USER_INFO_API_ENPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/profile';
var GET_CURRENT_TRIPS_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip/current';
var GET_BOOKING_BY_RIDER_AND_TRIP_ID_API_ENPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book/rider';
var UPDATE_PASSENGER_BOOKING_API_ENPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book';
var JUANDER_CONFIRM_CARPOOL_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/server';
var CURRENT_BROADCAST_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-jspot-api/broadcast/current';

/** SOURCE LOCATION */
var LOGIN_SOURCE_LOCATION = '../pages/login.html';
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
var driver_trip_generate_qrcode_btn = document.getElementById('driver_trip_generate_qrcode_btn');
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
var search_target_location_driver_button = document.getElementById('search_target_location_driver_button');
var find_carpool_saved_places = document.getElementById('find_carpool_saved_places');
var close_saved_places_button = document.getElementById('close_saved_places_button');
var search_fq_target_location = document.getElementById('search_fq_target_location');
var search_fq_target_location_button = document.getElementById('search_fq_target_location_button');

var _cacheExpiry = -(1/60); // 1 minute

/** CARPOOL MAIN PAGE */

function getResJSON(result) {
    return result.json();
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
};

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
                statusColor: '#ffffff',
                color: '#000000',
                bgColor: '#05a5df',
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
                statusColor: '#5aa949',
                color: '#ecf5e4',
                bgColor: '#ecf5e4',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        default: return null;
    }
}

function checkCurrentTripUpdateStatus(tripID) {
    fetch(VIEW_DRIVER_TRIPS_API_ENDPOINT + '/' + JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email)
    .then(getResJSON)
    .then(function (data) {
        if (data && data.length > 0) {
            var currentTrip = data.filter(function (trip) {
                return trip._id === tripID
            });

            if (currentTrip && currentTrip.length > 0) {
                hideActivityIndicator();

                if (currentTrip[0].updatedAt !== latest_driver_trip_datetime) {
                    getDriverTripSessionAPI(currentTrip[0]);
                } else {
                    showInfoAlertWithConfirmButtonHTML(function () {
                        showActivityIndicator();
                        delay(function () {
                            checkCurrentTripUpdateStatus(tripID);
                        }, 1000);
                    }, 'Updating booking request', 'Waiting for server to finish process. Please check again later', 'Reload');
                }
            } else {
                hideActivityIndicator();
                showErrorAlertWithConfirmButton(function () {
                    window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                }, 'Error 404', 'No trip found', 'Refresh');
            }
        } else {
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Error 404', 'No trip found', 'Refresh');
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

function updateRiderBookingByTripID(rider_email, status, tripID, rider_fullname) {
    fetch(GET_BOOKING_BY_RIDER_AND_TRIP_ID_API_ENPOINT + '/' + rider_email + '/trip/' + tripID)
        .then(getResJSON)
        .then(function (data) {
            if (data && data.length > 0) {
                var booking = data[0];

                var bookingID = booking._id;
                var payload = { status: status };
                var options = {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                };
                fetch(UPDATE_PASSENGER_BOOKING_API_ENPOINT + '/' + bookingID, options)
                    .then(getResJSON)
                    .then(function (data) {
                        if (data) {
                            var newPayload = {
                                action: "JUANDER_CONFIRM_CARPOOL",
                                params: {tripID: tripID, email: rider_email, fullname: rider_fullname, status: status},
                            };
                            var newOptions = {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(newPayload)
                            };
    
                            fetch(JUANDER_CONFIRM_CARPOOL_API_ENDPOINT, newOptions)
                                .then(getResJSON)
                                .then(function (data) {
                                    showSuccessAlertWithConfirmButton(function () {
                                        window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                                    }, 'Your booking is now ongoing', '', 'Done');
                                })
                                .catch(function (err) {
                                    console.error(err);
                                    hideActivityIndicator();
                                    showErrorAlertWithConfirmButton(function () {
                                        window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                                    }, 'Error 500', 'Internal server error', 'Refresh');
                                });
                        }
                    })
                    .catch(function (err) {
                        console.error(err);
                        hideActivityIndicator();
                        showErrorAlertWithConfirmButton(function () {
                            window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                        }, 'Error 500', 'Internal server error', 'Refresh');
                    });
            } else {
                hideActivityIndicator();
                showErrorAlertWithConfirmButton(function () {
                    window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                }, 'Error 404', 'No trip found', 'Refresh');
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

function generateTripCode(tripID) {
    var qrcode = new QRCode(document.getElementById("trip_qr_code"), {
        width: 220,
        height: 220,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    var encrypted = CryptoJS.AES.encrypt(tripID, _AES).toString();

    qrcode.clear();
    qrcode.makeCode(encrypted);

    document.getElementById('download_trip_qr_code').addEventListener('click', function () {
        htmlToImage.toPng(document.getElementById('trip_qr_code_container'))
            .then(function (dataUrl) {
                downloadURI(dataUrl, 'trip_qr_code.png');
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
                showErrorAlertWithConfirmButton(function () {
                    window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                }, 'Error 500', error, 'Refresh');
            });
    });
}

function scanTripQRCode (rider_email, currentTripID, userFullName) {
    var lastResult, countResults = 0;

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            var _scanner = new Html5Qrcode("scan_trip_qr_code");
            var cameraId = devices[devices.length - 1].id;
            var config = {
                fps: 10,
                qrbox: { width: 110, height: 110 }
            };

            _scanner.start(
                cameraId, 
                config,
                function (decodedText, decodedResult) {
                    if (decodedText !== lastResult) {
                        ++countResults;
                        lastResult = decodedText;

                        _scanner.stop().then((ignore) => {
                            _scanner.clear();
                            var scannedData = lastResult;
                            var decrypted = CryptoJS.AES.decrypt(scannedData, _AES).toString(CryptoJS.enc.Utf8);

                            if (decrypted === currentTripID) {
                                updateRiderBookingByTripID(rider_email, 3, decrypted, userFullName);
                            } else {
                                showErrorAlertWithConfirmButton(function() {}, 'Scan failed', 'Invalid QR code used', 'Okay');
                            }

                            var myModalEl = document.getElementById('scan-driver-qr-code');
                            var modal = bootstrap.Modal.getInstance(myModalEl)
                            modal.hide();
                        }).catch((err) => {
                            console.error(err);

                            showErrorAlertWithConfirmButton(function() {
                                showActivityIndicator();
                                reloadCurrentPage();
                            }, 'Scan failed', err, 'Okay');
                        });
                    }
                },
                function (err) {})
                .catch((err) => {
                    console.error(err);

                    showErrorAlertWithConfirmButton(function() {
                        showActivityIndicator();
                        reloadCurrentPage();
                    }, 'Scan failed', err, 'Okay');
                });
        } else {
            // document.getElementById('scan_ticket_reader').style.display = 'none';
            // qr_scan_status.style.display = 'block';
            // qr_scan_status.innerHTML = '<b>Error!</b> No cameras found';
        }
    })
    .catch(err => {
        console.error(err);
        // document.getElementById('scan_ticket_reader').style.display = 'none';
        // qr_scan_status.style.display = 'block';
        // qr_scan_status.innerHTML = '<b>Error!</b> Camera permission blocked';
    });
}

function getStatusPopup(bookingID, status, driverEmail, tripID, userEmail, userFullName) {
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
                completeTripBooking(bookingID, tripID, userEmail, userFullName);
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

function updatePassengerBookingsStatus (tripID, rider_email, rider_fullname, status, callback) {
    var newPayload = {
        action: "JUANDER_CONFIRM_CARPOOL",
        params: {tripID: tripID, email: rider_email, fullname: rider_fullname, status: status}
    };

    var newOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPayload)
    };

    fetch(JUANDER_CONFIRM_CARPOOL_API_ENDPOINT, newOptions)
        .then(getResJSON)
        .then(function (data) {
            hideActivityIndicator();

            if (data.code === 200) {
                callback();
            } else {
                showErrorAlertWithConfirmButton(function () {}, 'Error 400', 'Something went wrong. Please try again', 'Okay');
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

function getTripStatusPopup(tripID, status, riders, payload) {
    console.log('getTripStatusPopup')
    switch(status) {
        case 1:
            if (pending_riders_count > 0) {
                showQuestionAlertWithButtons(function () {
                    showActivityIndicator();
                    driver_trip_predeparture_btn.disabled = true;
                    driver_trip_start_btn.disabled = true;
                    driver_trip_cancel_btn.disabled = true;
                    driver_trip_generate_qrcode_btn.disabled = true;
                    driver_trip_complete_btn.disabled = true;
                    startTrip(tripID, riders);
                }, 'You have ' + pending_riders_count + ' pending ' + (pending_riders_count > 1 ? 'requests' : 'request'), 'Would you still like to start your trip?', 'Yes', 'No');
            } else {
                showQuestionAlertWithButtons(function () {
                    showActivityIndicator();
                    driver_trip_predeparture_btn.disabled = true;
                    driver_trip_start_btn.disabled = true;
                    driver_trip_cancel_btn.disabled = true;
                    driver_trip_generate_qrcode_btn.disabled = true;
                    driver_trip_complete_btn.disabled = true;
                    startTrip(tripID, riders);
                }, 'Trip Pending', 'Would you like to start your trip?', 'Yes', 'No');
            }
            break;
        case 2:
            showQuestionAlertWithButtons(function () {
                showActivityIndicator();
                driver_trip_predeparture_btn.disabled = true;
                driver_trip_start_btn.disabled = true;
                driver_trip_generate_qrcode_btn.disabled = true;
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
                driver_trip_generate_qrcode_btn.disabled = true;
                driver_trip_cancel_btn.disabled = true;
                driver_trip_complete_btn.disabled = true;
                cancelTrip(tripID, riders);
            }, 'Trip Pending', 'Would you like to cancel your trip?', 'Yes', 'No');
            break;
        // booking pop-ups
        case 4:
            showQuestionAlertWithButtons(function () {
                // GOLD
                console.log('confirm booking');
                showActivityIndicator();
                driver_trip_predeparture_btn.disabled = true;
                driver_trip_start_btn.disabled = true;
                driver_trip_cancel_btn.disabled = true;
                driver_trip_generate_qrcode_btn.disabled = true;
                driver_trip_complete_btn.disabled = true;
                confirmTripBooking(payload);
            }, 'Confirm Booking', 'Would you like to confirm this booking?', 'Yes', 'No');
            break;
        case 5:
            showQuestionAlertWithButtons(function () {
                showActivityIndicator();
                driver_trip_predeparture_btn.disabled = true;
                driver_trip_start_btn.disabled = true;
                driver_trip_cancel_btn.disabled = true;
                driver_trip_generate_qrcode_btn.disabled = true;
                driver_trip_complete_btn.disabled = true;
                ongoingTripBooking(payload);
            }, 'Update Booking', 'Would you like to update this booking?', 'Yes', 'No');
            break;
            case 6:
                showQuestionAlertWithButtons(function () {
                    showActivityIndicator();
                    driver_trip_predeparture_btn.disabled = true;
                    driver_trip_start_btn.disabled = true;
                    driver_trip_cancel_btn.disabled = true;
                    driver_trip_generate_qrcode_btn.disabled = true;
                    driver_trip_complete_btn.disabled = true;

                    completeTripBooking(payload.bookingID, payload.tripID, payload.email, payload.fullName);
                }, 'Complete Booking', 'Would you like to complete this booking?', 'Yes', 'No');
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

        if(booking.tripStatus == 1){
            document.querySelector('.current-booking-item').style.color = '#ffffff';
            // document.querySelector('.current-booking-item .heading').style.color = '#fff'
            // document.querySelector('.current-booking-item .datetime').style.color = '#fff'
            // document.querySelector('.current-booking-item .destination').style.color = '#fff'
            // document.querySelector('.current-booking-item .seat-number').style.color = '#fff'
        }

        document.querySelector('.current-booking-item').addEventListener('click', function () {
            var current = new Date();
            var given =  moment(new Date(booking.departTime), "YYYY-MM-DD HH:mm");
            var duration = moment.duration(given.diff(current)).asHours();

            if((duration - 8) < 0.5){
                // rider cant cancel booking
                getStatusPopup(booking._id == undefined ? booking['bookingID'] : booking._id, booking.status, booking.driver, booking.tripID, booking.email, booking.ridername);
            }else{
                if (booking.status === 4) {
                    showSuccessAlertWithConfirmButton(function () {}, 'Ongoing Trip with Driver', 'Enjoy your carpool ride experience', 'Okay') 
                } else {
                    getStatusPopup(booking._id == undefined ? booking['bookingID'] : booking._id, booking.status, booking.driver, booking.tripID, booking.email, booking.ridername);
                }
            }
        });

        hideActivityIndicator();
    }else{
        loadMainPage();
        hideActivityIndicator();
    }
}

function updateDriverUI(payload, status){
    driver_trip_booking_list.innerHTML = '';
    
    var localTrip = JSON.parse(localStorage.getItem(DRIVER_TRIP))
    localTrip = localTrip['data']
    //console.log(localTrip)
    
    if(payload['tripID'] == localTrip['_id']){
        var email, riderName, driverName;
        var _seats = localTrip['seats']
        var newTemp = []
        var newRider = localTrip['riders']
        
        driverName = localTrip['fullname']
        
        if(status == 1){
            localTrip['temp'].map(temp => {
                if(temp['bookingID'] == payload['bookingID']){
                    temp['status'] = status
                    email = temp['email']
                    riderName = temp['fullName']
                    newRider.push(temp)
                }else{
                    newTemp.push(temp)
                }
            })
        }else{
            newRider.map(rider => {
                if(rider['bookingID'] == payload['bookingID']){
                    rider['status'] = status
                    email = rider['email']
                    riderName = rider['fullName']
                }
            })
        }
        
        // Create trip seats
        newTemp.map(rider => {
            rider['tripID'] = payload.tripID;
            addBooking(rider, 0, payload.status);
            // _seats -= 1;
        });

        newRider.map(rider => {
            rider['tripID'] = payload.tripID;
            addBooking(rider, rider['status'], payload.status);
            _seats -= 1;
        });

        for (let i = 0; i < _seats; i++) { 
            var rider = {}
            addBooking(rider, -1, payload.status);
        }
        
        var objPayload = {
            "tripID": localTrip['_id'],
            "temp": newTemp,
            "riders": newRider,
            "tripStatus": localTrip['status'],
            "seatCount": _seats,
            "bookID": payload['bookingID'],
            "bookStatus": status,
            "email": email,
            "riderName": riderName,
            "driverName": driverName
        }
        
        var options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objPayload)
        };

        fetch(TRIP_BOOKING_API_ENDPOINT, options)
            .then(getResJSON)
            .then(function (data) {
                if (data) {
                    localTrip['temp'] = newTemp
                    localTrip['riders'] = newRider
                    localStorage.setItem(DRIVER_TRIP, JSON.stringify({'data': localTrip}))
                    window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                } else {
                    hideActivityIndicator();
                    showErrorAlertWithConfirmButton(function () {}, 'Error 400', 'Something went wrong. Please try again', 'Okay');
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
}

function confirmTripBooking(payload){
    // GOLD
    updateDriverUI(payload, 1)
}

function cancelTripBooking(bookingID, tripID, userEmail, userFullName){
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
            hideActivityIndicator();
            updatePassengerBookingsStatus(payload.tripID, payload.email, userFullName, 2, function () {
                localStorage.setItem(DRIVER_BOOKING, null);
                showSuccessAlertWithConfirmButton(function () {
                    showActivityIndicator();

                    delay(function () {
                        hideActivityIndicator();
                        loadMainPage();
                    }, 2000);
                }, 'Booking Cancelled', 'Booking request has been cancelled', 'Done');
            });
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}

function ongoingTripBooking(payload){
    // GOLD
    updateDriverUI(payload, 3)
}

function completeTripBooking(bookingID, tripID, userEmail, userFullName){
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
            hideActivityIndicator();
            updatePassengerBookingsStatus(payload.tripID, payload.email, userFullName, 4, function () {
                localStorage.setItem(DRIVER_BOOKING, null);
                showSuccessAlertWithConfirmButton(function () {
                    showActivityIndicator();

                    delay(function () {
                        hideActivityIndicator();
                        window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                    }, 2000);
                }, 'Booking Completed', 'Booking request has been completed', 'Done');
            });
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

function onBookingUpdate(event, payload){
    getTripStatusPopup("", 5, [], event)
}

function onBookingComplete(event, payload){
    getTripStatusPopup("", 6, [], event)
}

function addBooking(payload, status, tripStatus) {
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
      case 3:
            listStyle = 'list-item-ongoing'
            name = payload.fullName.split(" ")[0]
            location = payload.destination
            statusMessage = 'ongoing'
            break;
        case 4:
            listStyle = 'list-item-completed'
            name = payload.fullName.split(" ")[0]
            location = payload.destination
            statusMessage = 'completed'
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
    } else if (status === 1) {
        booking.addEventListener("click", onBookingUpdate.bind(event, payload), false);
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
    driver_trip_booking_list.innerHTML = '';

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

    pending_riders_count = trip.temp.length;
    console.log('trip', trip)
    document.getElementById('on_driver_trip_booking_name').innerHTML = bookingName;
    document.getElementById('on_driver_trip_departure_datetime').innerHTML = capitalize(timeFromNow) + ' ' + timeFromNowFormat;
    document.getElementById('on_driver_trip_location').innerHTML = '<span style=\"font-weight: 700;\">' + landmark + '</span>' + '<br/> ' + '<span style=\"font-size: 0.75rem;\">' + origin + '</span>';
    document.getElementById('on_driver_trip_departure_time').innerHTML = "<span style='font-weight: bold;'>Departure: </span>" + departureTime;
    document.getElementById('on_driver_trip_seat_number').innerHTML = trip.seatCount + '/' + trip.seats;

    // GOLD
    if (tripStatus === 1) {
        driver_trip_predeparture_btn.style.display = 'none';
        driver_trip_start_btn.style.display = 'none';
        driver_trip_generate_qrcode_btn.style.display = 'none';
        driver_trip_cancel_btn.style.display = 'none';
        driver_trip_complete_btn.style.display = 'block';

        generateTripCode(tripID);
    } else if (tripStatus === 0) {
        // driver_trip_predeparture_btn.style.display = 'block';
        driver_trip_start_btn.style.display = 'block';
        driver_trip_cancel_btn.style.display = 'block';
        driver_trip_generate_qrcode_btn.style.display = 'none';
        driver_trip_complete_btn.style.display = 'none';
    }

    // Create trip seats
    trip.temp.map(rider => {
        rider['tripID'] = tripID;
        addBooking(rider, 0, trip.status);
        seats -= 1;
    });

    trip.riders.map(rider => {
        rider['tripID'] = tripID;
        addBooking(rider, rider.status, trip.status);
        seats -= 1;
    });

    for (let i = 0; i < seats; i++) { 
        var rider = {}
        addBooking(rider, -1, trip.status);
    }

    // driver_trip_predeparture_btn.disabled = trip.riders.length > 0 ? false : true;
    // if all passengers are confirmed, driver can start the ride
    driver_trip_start_btn.disabled = false;
    // if all passengers are updated to completed status, driver can complete the ride
    // GOLD
    /*
    driver_trip_complete_btn.disabled = trip.riders.filter(function (rider) {
                                            return rider.status === 3 || rider.status === 4;
                                        }).length === trip.riders.length ? false : true;*/

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
    });
    driver_trip_complete_btn.addEventListener('click', function (e) {
        // GOLD
        // check if there are trips that is not in ongoing status
        var localTrip = JSON.parse(localStorage.getItem(DRIVER_TRIP))
        localTrip = localTrip['data']
        
        var riderCount = 0
        
        localTrip['riders'].map(rider => {
            if(rider['status'] == 1){
                riderCount++
            }
        })
        
        if(riderCount > 0){
            showErrorAlertWithConfirmButton(function () {}, 'Trip Confirmed', 'Make confirmed trip status ongoing to finish the trip', 'Ok');
        }else{
            return getTripStatusPopup(tripID, 2, trip.riders);
        }
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
    search_target_location.value = '';
    search_fq_target_location.value = user_login_data && user_login_data.address && user_login_data.landmark ? user_login_data.landmark + ', ' + user_login_data.address : user_login_data && user_login_data.address ? user_login_data.address : '';
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
    delay(function () {
        if(fromApi){
            driver_pool_results_container.innerHTML = '';
            console.log('loading from api');
            
            // check profile if there is an ongoing booking or trip
            var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email.toLowerCase();
            JUANDERSERVICE.userStatusCheck(email)
            .then(getResJSON)
            .then(function (data) {
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

function moveToIndexPage() {
    window.location.href = INDEX_SOURCE_LOCATION;
}

function onBackToPreviousPage() {
    driver_stops = [];
    address_field_change_button_group.innerHTML = "";
    showActivityIndicator();
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

            if (data && data.length > 0) {
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
                        var target_location = data[id].landmark + ', ' + data[id].origin;
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

function bookRideFromSuggestedRides(rider) {
    var passenger = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));
    var payload = {
        "tripID": rider.tripID,
        "email": passenger.email,
        "ridername": passenger.displayName,
        "driver": rider.driver,
        "drivername": rider.drivername,
        "destination": rider.destination,
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
            if (data) {
                hideActivityIndicator();

                var saved_bookings_history = localStorage.getItem(SAVED_BOOKINGS_HISTORY_LIST) ? JSON.parse(localStorage.getItem(SAVED_BOOKINGS_HISTORY_LIST)) : null;

                if (saved_bookings_history) {
                    var checkForDuplicates = saved_bookings_history.findIndex(function (trip) {
                        var combined = trip.landmark + ', ' + trip.address;
                        var currentTrip = rider.landmark + ', ' + rider.origin;

                        return combined.toLowerCase() === currentTrip.toLowerCase();
                    });
        
                    if (checkForDuplicates < 0) {
                        saved_bookings_history.push({
                            landmark: rider.landmark,
                            address: rider.origin
                        });
                        localStorage.setItem(SAVED_BOOKINGS_HISTORY_LIST, JSON.stringify(saved_bookings_history));
                    }
                } else {
                    var arr = [];
                    arr.push({
                        landmark: rider.landmark,
                        address: rider.origin
                    });
                    localStorage.setItem(SAVED_BOOKINGS_HISTORY_LIST, JSON.stringify(arr));
                }

                localStorage.setItem(DRIVER_BOOKING, JSON.stringify(data));

                var localBooking = JSON.parse(localStorage.getItem(DRIVER_BOOKING));

                if (localBooking.status === 0 || localBooking.status === 1 || localBooking.status === 4) {
                    var localBookingObj = {
                        data: localBooking,
                        createdAt: DATETIMESERVICE.getDateTime()
                    }
                    
                    localStorage.setItem(DRIVER_BOOKING, JSON.stringify(localBookingObj))
                    getRiderBookingsStatusAPI(localBooking)
                } else {
                    window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                }
            } else {
                hideActivityIndicator();
                showErrorAlertWithConfirmButton(function () {
                    window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                }, 'Error 404', 'No trip found', 'Refresh');
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

            if (data && data.code !== 400) {
                var saved_bookings_history = localStorage.getItem(SAVED_BOOKINGS_HISTORY_LIST) ? JSON.parse(localStorage.getItem(SAVED_BOOKINGS_HISTORY_LIST)) : null;

                if (saved_bookings_history) {
                    var checkForDuplicates = saved_bookings_history.findIndex(function (trip) {
                        var combined = trip.landmark + ', ' + trip.address;
                        var currentTrip = rider.landmark + ', ' + rider.origin;

                        return combined.toLowerCase() === currentTrip.toLowerCase();
                    });
        
                    if (checkForDuplicates < 0) {
                        saved_bookings_history.push({
                            landmark: rider.landmark,
                            address: rider.origin
                        });
                        localStorage.setItem(SAVED_BOOKINGS_HISTORY_LIST, JSON.stringify(saved_bookings_history));
                    }
                } else {
                    var arr = [];
                    arr.push({
                        landmark: rider.landmark,
                        address: rider.origin
                    });
                    localStorage.setItem(SAVED_BOOKINGS_HISTORY_LIST, JSON.stringify(arr));
                }

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
            } else {
                showErrorAlertWithConfirmButton(function () {}, 'Error 400', 'Something went wrong. Please try again', 'Okay');
            }
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
function bookCarpoolFromSuggestedRides(e) {
    var emptySeatBlock = '<div class=\"col-4 col-md-3\">'
                                + '<div class=\"avatar-container\">'
                                +     '<img class=\"avata\" src=\"../images/sample/no-avatar.png\" />'
                                + '</div>'
                                + '<p class=\"text-muted avatar-name avatar-name-unavailable\">Empty Seat</p>'
                            + '</div>';
    var tripID = e.id.split('_')[e.id.split('_').length - 1];
    var currentTrip = current_trips.filter(function(trip) { return trip._id === tripID })[0];

    var rider_location = currentTrip.origin.split(', ');
    var location = rider_location[rider_location.length - 1];
    var target_location = currentTrip.landmark + ', ' + currentTrip.origin;
    var is_pool_available = currentTrip.seats > 0 ? 'Available' : 'Unavailable';
    var rider_passengers = currentTrip.riders ? currentTrip.riders : null;
    var rider_passengers_count = rider_passengers ? rider_passengers.length : 0;

    var rider_phone_number = currentTrip.phone ? '+' + currentTrip.phone : '#';
    var rider_teams_email = currentTrip.email ? currentTrip.email : '#';
    var rider_department = currentTrip.department ? currentTrip.department : 'Cebu Pacific Air Inc.';
    var rider_fullname = currentTrip.fullname ? currentTrip.fullname : 'Unknown';
    var rider_depart_time = currentTrip.departTime ? moment(currentTrip.departTime).utc().format('h:mm a') : 'Unknown';
    var rider_passengers = currentTrip.riders ? currentTrip.riders : null;

    var offcanvas_rider_is_available = document.querySelector('.offcanvas_rider_is_available')
    var offcanvas_phone_number = document.querySelector('.offcanvas_phone_number');
    var offcanvas_rider_passengers_list = document.querySelector('.offcanvas_rider_passengers_list');

    document.querySelector('.offcanvas_rider_fullname').innerHTML = rider_fullname;
    document.querySelector('.offcanvas_rider_location').innerHTML = location;
    document.querySelector('.offcanvas_rider_department').innerHTML = rider_department;
    document.querySelector('.offcanvas_seats_count').innerHTML = currentTrip.seats === 1 ? ' seat available' : ' seats available';
    document.querySelector('.offcanvas_departure_time').innerHTML = rider_depart_time;
    document.querySelector('.offcanvas_target_location').innerHTML = target_location;
    document.querySelector('.offcanvas_teams_email a').href = MS_TEAMS_SEND_MESSAGE_TO_USER_LINK_URL + rider_teams_email;

    offcanvas_rider_is_available.innerHTML = is_pool_available;
    offcanvas_phone_number.href = 'tel:' + rider_phone_number;
    offcanvas_phone_number.innerHTML = rider_phone_number;

    if (offcanvas_rider_is_available.classList.contains('bg-primary') && currentTrip.seats < 1) {
        offcanvas_rider_is_available.classList.remove('bg-primary');
        offcanvas_rider_is_available.classList.add('bg-secondary');
    } else {
        offcanvas_rider_is_available.classList.add('bg-primary');
        offcanvas_rider_is_available.classList.remove('bg-secondary');
    }

    if (rider_passengers_count > 0) {
        var blocks = '';

        for (var i = 0; i < currentTrip.seatCount; i++) {
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
        var totalEmptySeats = currentTrip.seatCount - rider_passengers_count;
        var blocks = '';

        for (var i = 0; i < totalEmptySeats; i++) {
            blocks += emptySeatBlock;
        }

        document.querySelector('.offcanvas_seats_count').innerHTML = totalEmptySeats + ' seats available';
        offcanvas_rider_passengers_list.innerHTML = blocks;
    }

    join_pool_rider_button.addEventListener('click', onJoinPoolRider(currentTrip));
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
function findCarpoolFromSavedBookings(e) {
    var element = e.id.split('_');
    var _id = element[element.length - 1];
    var saved_bookings_history = localStorage.getItem(SAVED_BOOKINGS_HISTORY_LIST) ? JSON.parse(localStorage.getItem(SAVED_BOOKINGS_HISTORY_LIST)) : null;

    if(saved_bookings_history) {
        find_carpool_search_key = saved_bookings_history[_id].landmark + ', ' + saved_bookings_history[_id].address;
        find_carpool_navigate_container.style.display = 'block';
        find_carpool_saved_places.style.display = 'none';
        onFindCarpoolRide();
    }
}
function loadSavedBookingsList() {
    var saved_bookings_history = localStorage.getItem(SAVED_BOOKINGS_HISTORY_LIST) ? JSON.parse(localStorage.getItem(SAVED_BOOKINGS_HISTORY_LIST)) : null;

    if (saved_bookings_history) {
        document.querySelector('.frequently-used-list h4').style.display = 'block';
        frequently_used_address_list.innerHTML = '';
        frequently_used_address_list.innerHTML = saved_bookings_history.map(function (trip, i) {
            return '<div class=\"col-12\" style=\"border-bottom: 1px solid #F1F0F0;\">' +
                        '<button type=\"button\" class=\"btn btn-outline address-field-change-button d-flex flex-row align-items-center\" id=\"find_carpool_booking_address_' + i + '\" onclick=\"findCarpoolFromSavedBookings(this)\">' +
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
        document.querySelector('.frequently-used-list h4').style.display = 'none';
        frequently_used_address_list.innerHTML = '<p class=\"absolute-center\" style=\"font-size: 0.75rem; text-align: center;\">No saved bookings found</p>';
    }
}
function loadFindCreatedTripsHistoryList() {
    fetch(GET_CURRENT_TRIPS_API_ENDPOINT)
        .then(getResJSON)
        .then(function (current_created_trips) {
            current_created_trips = current_created_trips.filter(function (created_trip) {
                return created_trip.status === 0 || created_trip.status === 1;
            });

            if (current_created_trips && current_created_trips.length > 0) {
                current_trips = current_created_trips;
                find_carpool_address_list.innerHTML = '';
                find_carpool_address_list.innerHTML = current_created_trips.map(function (trip, i) {
                    return '<div class=\"col-12\" style=\"border-bottom: 1px solid #F1F0F0;\">' +
                                '<button type=\"button\" class=\"btn btn-outline address-field-change-button d-flex flex-row align-items-center\" id=\"find_carpool_address_' + trip._id + '\" onclick=\"bookCarpoolFromSuggestedRides(this)\" data-bs-toggle="offcanvas" data-bs-target="#show_confirm_carpool_rider" aria-controls="show_confirm_carpool_rider">' +
                                    '<span class=\"icon\"><i class=\"fa-solid fa-location-dot\"></i></span>' +
                                    '<span class=\"details\">' +
                                        '<span class=\"landmark-label\" id=\"landmark_label\">' + trip.landmark + '</span>' +
                                        '<span class=\"address-label\" id=\"address_label\">' + trip.origin + '</span>' +
                                        '<span class=\"depart-time-label\" id=\"depart_time_label\"><b>Departure</b> ' + moment(trip.departTime).utc().format('h:mm a') + '</span>' +
                                    '</span>' +
                                    '<span class=\"icon\"><i class=\"fa-solid fa-arrow-right\"></i></span>' +
                                '</button>' +
                            '</div>';
                }).join('');
            } else {
                find_carpool_address_list.innerHTML = '<p class=\"absolute-center\">No created trips found</p>';;
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
        share_carpool_address_list.innerHTML = '<p class=\"absolute-center\">No created trips found</p>';
    }
}

function onCarpoolRidelist () {
    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

    if (share_a_ride_button.classList.contains('active-tab-button')) {
        share_a_ride_button.classList.remove('active-tab-button');
    }

    search_target_location.value = '';
    search_fq_target_location.value = user_login_data && user_login_data.address && user_login_data.landmark ? user_login_data.landmark + ', ' + user_login_data.address : user_login_data && user_login_data.address ? user_login_data.address : '';

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
        hideMoreCarpoolButtonsContainer();
        join_pool_rider_button.disabled = true;
        loadCarpoolOnTripScreen(rider);
    }
}

carpool_ride_list_button.addEventListener('click', onCarpoolRidelist);

search_target_location.addEventListener("keypress", function() {
    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));
    hideMainBottomNavbar();
    hideMainTopNavbar();
    find_carpool_navigate_container.style.display = 'none';
    find_carpool_saved_places.style.display = 'block';
    search_fq_target_location.value = user_login_data && user_login_data.address && user_login_data.landmark ? user_login_data.landmark + ', ' + user_login_data.address : user_login_data && user_login_data.address ? user_login_data.address : '';
    loadSavedBookingsList();
});

search_target_location.addEventListener("click", function() {
    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));
    hideMainBottomNavbar();
    hideMainTopNavbar();
    find_carpool_navigate_container.style.display = 'none';
    find_carpool_saved_places.style.display = 'block';
    search_fq_target_location.value = user_login_data && user_login_data.address && user_login_data.landmark ? user_login_data.landmark + ', ' + user_login_data.address : user_login_data && user_login_data.address ? user_login_data.address : '';
    loadSavedBookingsList();
});

close_saved_places_button.addEventListener("click", function(e) {
    e.preventDefault();
    find_carpool_navigate_container.style.display = 'block';
    find_carpool_saved_places.style.display = 'none';
    showActivityIndicator();
    reloadCurrentPage(true);
});

search_fq_target_location.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        find_carpool_search_key = e.target.value;
        find_carpool_navigate_container.style.display = 'block';
        find_carpool_saved_places.style.display = 'none';
        onFindCarpoolRide();
    }
});

search_fq_target_location_button.addEventListener("click", function(e) {
    e.preventDefault();
    find_carpool_search_key = search_fq_target_location.value;
    find_carpool_navigate_container.style.display = 'block';
    find_carpool_saved_places.style.display = 'none';
    onFindCarpoolRide();
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
    console.log('startTrip')
    fetch(UPDATE_TRIP_STATUS_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            console.log(data)
            console.log('after startTrip')
            driver_trip_predeparture_btn.disabled = true;
            driver_trip_start_btn.disabled = true;
            driver_trip_cancel_btn.disabled = true;
            driver_trip_generate_qrcode_btn.disabled = false;
            driver_trip_complete_btn.disabled = false;

            driver_trip_predeparture_btn.style.display = 'none';
            driver_trip_start_btn.style.display = 'none';
            driver_trip_cancel_btn.style.display = 'none';
            driver_trip_generate_qrcode_btn.style.display = 'none';
            driver_trip_complete_btn.style.display = 'block';

            generateTripCode(_id);

            hideActivityIndicator();
            var localTrip = JSON.parse(localStorage.getItem(DRIVER_TRIP))
            localTrip['data']['status'] = 1;
            localStorage.setItem(DRIVER_TRIP, JSON.stringify({'data': localTrip}));
            localStorage.setItem(DRIVER_TRIP_STATUS_KEY, 'ongoing');
            window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
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
                window.location.href = LOGIN_SOURCE_LOCATION;
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
                            address: location,
                            lat: data.lat,
                            lng: data.lng,
                            kmZero: data.kmZero
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

function checkAnnouncements() {
    fetch(CURRENT_BROADCAST_API_ENDPOINT)
        .then(getResJSON)
        .then(function (data) {
            if (data) {
                if (data.type === 0) {
                    if (!localStorage.getItem(IS_ADVERTISEMENTS_LOADED_KEY) || localStorage.getItem(IS_ADVERTISEMENTS_LOADED_KEY) !== data._id) {
                        var carouselItems = data.sections && data.sections.length > 0 ? data.sections.map(function(section, i) {
                            return '<div class=\"carousel-item' + (i === 0 ? ' active\" data-bs-interval=\"2000\"': '\" ') + 'style=\"text-align: center; height: 100%; overflow: auto;\">' +
                                        '<div class="d-flex flex-column justify-content-center" style="height: 100%;">' +
                                            '<img src=\"' + section.imageUrl + '\" class=\"d-block\" alt=\"' + section.title + '\">' +
                                        '</div>' +
                                    '</div>';
                        }).join('') : '';
                        var carouselButtons = data.sections && data.sections.length > 0 ? data.sections.map(function(section, i) {
                            return '<button type=\"button\" data-bs-target=\"#carousel_advertisement\" data-bs-slide-to=\"' + i + '\" ' + (i === 0 ? 'class=\"active\" aria-current=\"true\"' : '') + ' aria-label=\"Slide ' + (i + 1) + '\"></button>'
                        }).join('') : '';
    
                        document.querySelector('.advertisement-modal .carousel-inner').innerHTML = carouselItems;
                        document.querySelector('.advertisement-modal .carousel-indicators').innerHTML = carouselButtons;
    
                        new bootstrap.Modal(advertisement_modal, {
                            keyboard: false
                        }).show();
                
                        localStorage.setItem(IS_ADVERTISEMENTS_LOADED_KEY, data._id);
                    }
                } else {
                    if (!localStorage.getItem(NEW_FEATURES_LOADED_KEY) || localStorage.getItem(NEW_FEATURES_LOADED_KEY) !== data._id) {
                        var carouselItems = data.sections && data.sections.length > 0 ? data.sections.map(function(section, i) {
                            return '<div class=\"carousel-item' + (i === 0 ? ' active\" data-bs-interval=\"2000\"': '\" ') + 'style=\"text-align: center; overflow: auto;\">' +
                                        '<div class=\"feature-container d-block\">' +
                                            '<div class=\"image-container\">' +
                                                '<img src=\"' + section.imageUrl + '\" alt=\"new sign up form\" />' +
                                            '</div>' +
                                            '<h4 class=\"highlight\">' + section.title + '</h4>' +
                                            '<p>' + section.details + '</p>' +
                                        '</div>' +
                                    '</div>';
                        }).join('') : '';
                        var carouselButtons = data.sections && data.sections.length > 0 ? data.sections.map(function(section, i) {
                            return '<button type=\"button\" data-bs-target=\"#carousel_new_features\" data-bs-slide-to=\"' + i + '\" ' + (i === 0 ? 'class=\"active\" aria-current=\"true\"' : '') + ' aria-label=\"Slide ' + (i + 1) + '\"></button>'
                        }).join('') : '';
    
                        document.querySelector('.new-feature-modal .carousel-inner').innerHTML = carouselItems;
                        document.querySelector('.new-feature-modal .carousel-indicators').innerHTML = carouselButtons;
    
                        new bootstrap.Modal(new_feature_modal, {
                            keyboard: false
                        }).show();
                
                        localStorage.setItem(NEW_FEATURES_LOADED_KEY, data._id);
                    } else {}
                }
            }
        })
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

    var isWithinScopeDuration = duration >= 0.5 && duration <= 24 ? true : false;

    var isSeatMaxLength = parseInt(driver_available_seats.value) > 0 && parseInt(driver_available_seats.value) <= 30;

    if (!isAllNumeric) {
        showErrorAlert('Invalid number format', 'Seat Number should numbers (0 to 9)');
    } else if (!inPhoneFormat) {
        showErrorAlert('Invalid phone number format', 'Phone number should be in this format: 9xx xxx xxxx or 9xxxxxxxxx');
    } else if (!isSeatMaxLength) {
        showErrorAlert('Invalid seat number', 'Seat numbers can be only up to 30');
    } else if (!isWithinScopeDuration || !isValidDepartureDateTime) {
        showErrorAlert('Invalid departure time', 'Departure must be set at least 30 minutes up to 24 hours from current date and time');
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

search_target_location_driver_button.addEventListener("click", function(event) {
    event.preventDefault();
    share_carpool_search_key = search_target_location_driver.value;
    onMoreShareRide();
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
    checkAppVersion(function () {
        if (checkCurrentSession()) {
            document.querySelector('.carpool-page-container').style.display = 'none';
            showActivityIndicator();
    
            reloadCurrentPage(true);
            checkAnnouncements();
            // console.log('booking', bookingFromCache())
            // console.log('trip', tripFromCache())
        } else {
            moveToIndexPage();
        }
    }, function () {
        moveToIndexPage();
    });
});