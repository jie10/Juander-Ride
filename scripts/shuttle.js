/** GET COMPONENTS */
const SHUTTLE_PAGE_SOURCE_LOCATION = '../pages/shuttle.html';
var DRIVER_TRIP = 'driver_trip';
var DRIVER_BOOKING = 'user_booking';
var SHUTTLE_TRIPS = 'shuttle_trips';
var SHUTTLE_BOOKING = 'shuttle_booking';

/** API ENDPOINTS */
var UPDATE_BOOKING_STATUS_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book';

var scan_qr_btn = document.getElementById('scan_qr_btn');
var scan_qr_btn_container = document.getElementById('scan_qr_btn_container');
var scan_qr_message = document.getElementById('scan_qr_message');
var scan_qr_message_text = document.getElementById('scan_qr_message_text');
var shuttle_trip_list = document.getElementById('shuttle_trip_list');
var shuttle_trip_container = document.getElementById('shuttle_trip_container');

var scanner_viewcontroller = document.getElementById('scanner_viewcontroller');
var scanner_close_btn = document.getElementById('scanner_close_btn');

var scanner_success_viewcontroller = document.getElementById('scanner_success_viewcontroller');
var scan_ticket_reader = document.getElementById('scan_ticket_reader');

var scanner_confirm_viewcontroller = document.getElementById('scanner_confirm_viewcontroller');
var scanner_confirm_btn = document.getElementById('scanner_confirm_btn');
var scanner_confirm_viewcontroller_title = document.getElementById('scanner_confirm_viewcontroller_title');
var scanner_confirm_viewcontroller_shuttle = document.getElementById('scanner_confirm_viewcontroller_shuttle');
var scanner_confirm_viewcontroller_origin = document.getElementById('scanner_confirm_viewcontroller_origin');
var scanner_confirm_viewcontroller_destination = document.getElementById('scanner_confirm_viewcontroller_destination');

var scanner_success_viewcontroller = document.getElementById('scanner_success_viewcontroller');
var scanner_continue_btn = document.getElementById('scanner_continue_btn');
var scanner_success_viewcontroller_title = document.getElementById('scanner_success_viewcontroller_title');
var scanner_success_viewcontroller_message = document.getElementById('scanner_success_viewcontroller_message');
var scanner_success_viewcontroller_trip_title = document.getElementById('scanner_success_viewcontroller_trip_title');

var shuttle_ride_card = document.getElementById('shuttle_ride_card');
var shuttle_ride_card_container = document.getElementById('shuttle_ride_card_container');
var shuttle_ride_card_title = document.getElementById('shuttle_ride_card_title');
var shuttle_ride_card_datetime = document.getElementById('shuttle_ride_card_datetime');
var shuttle_ride_card_destination = document.getElementById('shuttle_ride_card_destination');
var shuttle_ride_card_seats = document.getElementById('shuttle_ride_card_seats');
var shuttle_ride_card_status = document.getElementById('shuttle_ride_card_status');

var activity_indicator = document.getElementById('activity_indicator');
var map_bg = document.getElementById('map_bg');

/** ADD EVENTS */
scan_qr_btn.addEventListener('click', onScanQrCode);
scanner_close_btn.addEventListener('click', onScannerClose);
scanner_confirm_btn.addEventListener('click', onScannerConfirm);
scanner_continue_btn.addEventListener('click', onScannerContinue);

var _scanner;
var _payload;
var _isLocal = true;
var _hasCarpoolBooking = false;
var _hasShuttleBooking = false;
var _hasCarpoolTrip = false;
var _cacheExpiry = 1; // 1 minute

/** FUNCTIONS */

/** FUNCTIONS */
function getTimeDifference(start, end) {
    var startTime = new Date(start); 
    var endTime = new Date(end);
    var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);
    return resultInMinutes
}

function getDateTime(isLocal) {
    var today = new Date()
    
    if(isLocal){
        today.setHours( today.getHours())
    }else{
        today.setHours( today.getHours() + 8 )
    }
    
    var dd = String(today.getDate())
    if(dd.length == 1){dd = '0' + dd}
    var mm = String(today.getMonth() + 1)
    if(mm.length == 1){mm = '0' + mm}
    var yyyy = today.getFullYear()

    var hour = String(today.getHours())
    if(hour.length == 1){hour = '0' + hour}
    var min = String(today.getMinutes())
    if(min.length == 1){min = '0' + min}
    var sec = String(today.getSeconds())
    if(sec.length == 1){sec = '0' + sec}
    var millisec = String(today.getMilliseconds())

    today = yyyy + '-' + mm + '-' + dd +'T'+ hour + ':' + min + ':' + sec + '.' + millisec + 'Z';
    return today
}

function getResJSON(result) {
    return result.json();
}

function updateBookingStatus(callback, bookingID, bookingSttaus) {
    var payload = {
        "status": bookingSttaus
    }
    
    var options = {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    };

    fetch(UPDATE_BOOKING_STATUS_API_ENDPOINT + '/' + bookingID, options)
        .then(getResJSON)
        .then(function (data) {
            // console.log(data)
            delay(function () {
                hideActivityIndicator();
                callback();
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

function hideActivityIndicator() {
    activity_indicator.style.visibility = "collapse";
}

function delay(callback, TIMEOUT_IN_SECONDS) {
    setTimeout(callback, TIMEOUT_IN_SECONDS);
}

function onScannerContinue (e) {
    e.preventDefault();
    activity_indicator.style.visibility = "visible";
    scanner_success_viewcontroller.style.visibility = "collapse";
    
    // fetch user booking to update booking card
    var userObj = localStorage.getItem('user_login_data');
    userObj = JSON.parse(userObj);
    JUANDERSERVICE.userShuttleCheck(userObj['email'])
    .then(getResJSON)
    .then(function (data) {
        if(data['trip'] == null && data['booking'] == null){
            reloadTripList();
        }

        if(data['booking'] != null){
            if (data['booking'].status === 0 || data['booking'].status === 1 || data['booking'].status === 3) {
                setTimeout(() => {
                    
                    var localBooking = {
                        data: data['booking'],
                        createdAt: DATETIMESERVICE.getDateTime()
                    }
                    
                    localStorage.setItem(DRIVER_BOOKING, JSON.stringify(localBooking));
                    shuttle_trip_list.style.visibility = 'collapse';
                    scan_qr_btn.style.visibility = "collapse";
                    
                    if(data['booking']['booktype'] == 1){
                       showCard(data['booking']);
                    }
                    
                    hideActivityIndicator();
                }, 1000);
            }
        }
    })
    .catch(function (err) {
        console.error(err);
        hideActivityIndicator();
        showErrorAlertWithConfirmButton(function () {
            window.location.href = SHUTTLE_PAGE_SOURCE_LOCATION;
        }, 'Error 500', 'Internal server error', 'Refresh');
    });
}

function onScannerConfirm (e) {
    e.preventDefault();
    activity_indicator.style.visibility = "visible";
    var userObj = localStorage.getItem('user_login_data');
    userObj = JSON.parse(userObj);
        
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "tripID": _payload['_id'],
            "email": userObj['email'],
            "ridername": userObj['displayName'],
            "driver": _payload['email'],
            "drivername": _payload['fullname'],
            "destination": _payload['origin'],
            "booktype": _payload['tripType']
        })
    };

    fetch('https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book', options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            if(data != undefined){        
                if(data['code'] == 400){
                    console.log(data)
                    scanner_success_viewcontroller_trip_title.innerHTML = _payload.fullname;
                    scanner_success_viewcontroller_title.innerHTML = "Oops!";
                    scanner_success_viewcontroller_message.innerHTML = data['message'];
                }

                setTimeout(() => {
                    scanner_success_viewcontroller_trip_title.innerHTML = _payload.fullname;
                    scanner_confirm_viewcontroller.style.visibility = "collapse";
                    scanner_success_viewcontroller.style.visibility = "visible";
                    activity_indicator.style.visibility = "collapse";
                }, 1500);
            }
        })
        .catch(function (err) {
            console.error(err);
            setTimeout(() => {
                hideActivityIndicator();
                showErrorAlertWithConfirmButton(function () {
                    // window.location.href = SHUTTLE_PAGE_SOURCE_LOCATION;
                }, 'Error 500', 'Internal server error. Please check your internet.', 'Ok');
            }, 1000);
        });
}

function onScannerClose (e) {
    e.preventDefault();
    _scanner.stop().then((ignore) => {
      // QR Code scanning is stopped.
        _scanner.clear();
       _payload = undefined;
        scan_qr_btn.style.backgroundColor = "#cccccc";
        scanner_viewcontroller.style.visibility = "collapse";
    }).catch((err) => {
      // Stop failed, handle it.
        console.error(err);
    });
}

function onScanQrCode (e) {
    if(_hasCarpoolTrip || _hasCarpoolBooking || _hasShuttleBooking){
        var errorMessage = ''
        if(_hasCarpoolTrip){
            errorMessage = 'carpool trip'
        }else if(_hasCarpoolBooking){
            errorMessage = 'carpool booking'   
        }else if(_hasShuttleBooking){
            errorMessage = 'shuttle booking'        
        }
        
        showErrorAlertWithConfirmButton(function () {
            // window.location.href = SHUTTLE_PAGE_SOURCE_LOCATION;
        }, 'Error', 'You currently has a ' + errorMessage + '. Please cancel trip to use shuttle services.', 'Ok');
    }else{
        activity_indicator.style.visibility = "visible";
    
        if(_payload){
           var lastResult = "";
            var countResults = 0;
            // console.log(lastResult);
            e.preventDefault();

            scanner_viewcontroller.style.visibility = "visible";

            Html5Qrcode.getCameras().then(devices => {
                if (devices && devices.length) {
                    var cameraId;             
                    _scanner = new Html5Qrcode("scan_ticket_reader");

                    if(_isLocal){
                        cameraId = devices[0].id;
                    }else{
                        if (devices.length === 1) {
                            cameraId = devices[0].id;
                        }else if(devices.length === 2){
                            cameraId = devices[1].id;  
                        }else if(devices.length > 2){
                            cameraId = devices[2].id;  
                        }
                    }

                    var config = {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1.7777778
                    };

                    setTimeout(() => {
                        activity_indicator.style.visibility = "collapse";
                    }, 1500);

                    _scanner.start(
                        cameraId, 
                        config,
                        function (decodedText, decodedResult) {
                            if(decodedText != lastResult){
                                lastResult = decodedText;
                                // console.log(decodedText);
                                // html5QrCode.clear();

                                var bytes = CryptoJS.AES.decrypt(lastResult, 'technologyandinnovation');
                                var qrcode = bytes.toString(CryptoJS.enc.Utf8);

                                _scanner.stop().then((ignore) => {
                                  // QR Code scanning is stopped.
                                    // console.log("stop");

                                    if (_payload.email === JSON.parse(qrcode).email) {
                                        _scanner.clear();
                                        scanner_viewcontroller.style.visibility = "collapse";

                                        scanner_confirm_viewcontroller_title.innerHTML = _payload['fullname']
                                        scanner_confirm_viewcontroller_shuttle.innerHTML = _payload['fullname']
                                        scanner_confirm_viewcontroller_origin.innerHTML = "AOC Pasay"
                                        scanner_confirm_viewcontroller_destination.innerHTML = _payload['origin']
    
                                        scanner_confirm_viewcontroller.style.visibility = "visible";
                                    } else {
                                        _scanner.clear();
                                        _payload = undefined;
                                        scan_qr_btn.style.backgroundColor = "#cccccc";
                                        scanner_viewcontroller.style.visibility = "collapse";
                                        showErrorAlert('Error', 'It seems you are in a wrong shuttle. Please try another ride');
                                    }
                                }).catch((err) => {
                                  // Stop failed, handle it.
                                    console.error(err);
                                });
                            }

                        },
                        function (err) {
                            // Swal.hideLoading();
                        })
                    .catch((err) => {

                    });
                } else {
                    console.log("no cameras found!");
                }
            })
        }
    }
}


var onShuttleCardTap = function(event, payload){
    console.log('onShuttleCardTap');
}


var onTripSelect = function(event, payload){
    _payload = event;
    scan_qr_btn.style.pointerEvents = null;
    scan_qr_btn.style.backgroundColor = "#05a5df";
}

function reloadTripList() {
    var cacheExpired = false;
    _payload = undefined;
    scan_qr_btn.style.visibility = "collapse";
    scan_qr_btn.style.backgroundColor = "#cccccc";
    shuttle_trip_list.innerHTML = ''
    
    var localShuttle = JSON.parse(localStorage.getItem(SHUTTLE_TRIPS))
    
    if(localShuttle != null){
        // get data from local storage
        var todayTime = getDateTime(true)
        var duration = getTimeDifference(localShuttle['createdAt'], todayTime)
        
        // var givenDate = moment(new Date(localShuttle['createdAt'])).format("YYYY-MM-DD HH:mm");
        // var given =  moment(new Date(givenDate), "YYYY-MM-DD HH:mm");
        // var duration = moment.duration(given.diff(new Date())).asHours();
        // duration = duration - 8;

        console.log('duration reload trip list', duration + ' > ' + _cacheExpiry);
        // one minute local storage life
        if(duration > _cacheExpiry){
            console.log('local cache expired');
            cacheExpired = true;
            activity_indicator.style.visibility = "collapse";
        }else{
            setTimeout(() => {
                localShuttle.data.map(trip => {
                    addTrip(trip)
                })

                scan_qr_btn.style.visibility = "visible"
                activity_indicator.style.visibility = "collapse";
            }, 1000);
        }
    }else{
        cacheExpired = true;
    }
    
    if(cacheExpired){
        var options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "pointA": "luneta, manila",
                "tripType": 1
            })
        };

        fetch('https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/match/trip', options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            console.log('trip list', data);
            
            if(data != undefined){
                if(data.length > 0){
                    // add to local storage
                    var storagedata = {data: data, createdAt: DATETIMESERVICE.getDateTime()}
                    localStorage.setItem(SHUTTLE_TRIPS, JSON.stringify(storagedata))

                    // populate shuttle list
                    data.map(trip => {
                        addTrip(trip)
                    })

                    scan_qr_btn.style.visibility = "visible"
                    activity_indicator.style.visibility = "collapse";
                }else{
                    shuttle_trip_container.innerHTML = "<p style='text-align: center; margin-top: 32px;'>No shuttle trips found.</p>"
                    activity_indicator.style.visibility = "collapse";
                    localStorage.setItem(SHUTTLE_TRIPS, null);
                }  
            }
        })
        .catch(function (err) {
            console.error(err);
            setTimeout(() => {
                hideActivityIndicator();
                shuttle_trip_container.innerHTML = "<p style='text-align: center; margin-top: 32px;'>Please check your internet connection.</p>"
                showErrorAlertWithConfirmButton(function () {
                    // window.location.href = SHUTTLE_PAGE_SOURCE_LOCATION;
                }, 'Error 500', 'Internal server error. Please check your internet.', 'Ok');
            }, 1000);
        });
    }
}

function addTrip(payload) {
    var trip = document.createElement("li");
    trip.style = "padding-top: 6px; padding-bottom: 6px;"
    trip.addEventListener("click", onTripSelect.bind(event, payload), false);
    
    var timeFromNowFormat = moment(payload.departTime).utc().format('h:mm a');
    
    trip.innerHTML = "<div style='display: flex; height: 110px;  border-radius: 12px; border: 1px solid #dfdfdf;'>"
    + "<div style='flex-grow: 1;'>"
    + "<img style='border-radius: 8px; width: 40px; margin-top: 16px; margin-left: 24px;' src='../images/sample/no-avatar.png'/>"
    + "</div>"
    + "<div style='flex-grow: 4;'>"
    + "<p style='padding: 16px 0 0 0; margin: 0; line-height: 1em; font-size: 1.2rem; font-weight: bold;'>" + payload['fullname'] + "</p>"
    + "<p style='padding: 0; margin: 0; line-height: 1.1em; font-size: 0.8rem;'>" + payload['origin'] + "</p>"
    + "<p style='padding: 12px 0 0 0; margin: 0; line-height: 1em; font-size: 0.8rem;'><span style='font-weight: bold;'>Mobile:</span> +"+payload['phone']+"</p>"
    + "<p style='padding: 2px 0 0 0; margin: 0; line-height: 1em; font-size: 0.8rem;'><span style='font-weight: bold;'>Departure:</span> "+timeFromNowFormat+"</p>"
    + "</div>"
    + "<div style='flex-grow: 2; text-align: end'>"
    + "<p style='margin: 18px 24px 0 0; padding: 0; line-height: 1em; font-size: 1.8rem; font-weight: bold;'>" + payload['seats'] + "</p>"
    + "<p style='padding: 0; margin: 0; line-height: 1em; font-size: 0.8rem; margin-right: 24px;'>seats</p>"
    + "</div>"
    + "</div>"

    shuttle_trip_list.appendChild(trip);
}

function showCard(localbooking){
    var timeFromNowFormat = moment(localbooking.departTime).utc().format('MMMM D YYYY  h:mm a');
    var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
    try {
        var shuttleData = JSON.parse(localStorage.getItem('shuttle_trips')).data.filter(function (shuttle) {
        return shuttle.email === localbooking.driver
        })[0];

        driverPhoneNumber = shuttleData ? '+' + shuttleData.phone : null;
    } catch(e) {
        driverPhoneNumber = '';
    }

    map_bg.style.display = 'block';
    // console.log(localbooking)
    // set card UI design
    switch(localbooking.status){
        case 1:
            shuttle_ride_card_container.style.backgroundColor = '#ecf5e4';
            shuttle_ride_card_status.style.color = '#ecf5e4';
            shuttle_ride_card_status.style.backgroundColor = '#5aa949';
            shuttle_ride_card_status.innerHTML = "Confirmed";
            break;
        case 2:
            shuttle_ride_card_container.style.backgroundColor = '#e2e3e2';
            shuttle_ride_card_status.style.color = '#e2e3e2';
            shuttle_ride_card_status.style.backgroundColor = '#858586';
            shuttle_ride_card_status.innerHTML = "Cancelled";
            break;
        case 3:
            shuttle_ride_card_container.style.backgroundColor = '#eaf6f8';
            shuttle_ride_card_status.style.color = '#eaf6f8';
            shuttle_ride_card_status.style.cursor = 'default';
            shuttle_ride_card_status.style.backgroundColor = '#0061a8';
            shuttle_ride_card_status.innerHTML = "Ongoing";
            break;
        case 4:
            shuttle_ride_card_container.style.backgroundColor = '#bafff6';
            shuttle_ride_card_status.style.color = '#bafff6';
            shuttle_ride_card_status.style.backgroundColor = '#009883';
            shuttle_ride_card_status.innerHTML = "Completed";
            break;
    }
    
    shuttle_ride_card_title.innerHTML = localbooking['drivername']
    shuttle_ride_card_datetime.innerHTML = (timeFromNow) + ' ' + timeFromNowFormat;
    shuttle_ride_card_destination.innerHTML = localbooking['destination']
    shuttle_ride_card_seats.innerHTML = localbooking['seats'] +"/"+ localbooking['seatCount'] + " seats"

    shuttle_ride_card.style.visibility = 'visible';
    shuttle_ride_card.style.display = 'block';

    shuttle_ride_card.addEventListener('click', function (e) {
        getStatusPopup(localbooking.status, driverPhoneNumber, localbooking._id);
    });
}

function hideCard() {
    map_bg.style.display = 'none';
    shuttle_ride_card.style.visibility = 'collapse';
    shuttle_ride_card.style.display = 'none';
}

function getStatusPopup(bookingStatus, driverPhoneNumber, bookingID) {
    switch(bookingStatus) {
        case 1:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                if (driverPhoneNumber) {
                    window.open('tel:' + driverPhoneNumber);
                }
            }, 'Booking confirmed', 'You are all set for your trip', 'Message Driver');
            break;
        case 2:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                showActivityIndicator();
                updateBookingStatus(function () {
                    localStorage.setItem(DRIVER_BOOKING, null);
                    hideCard();
                    showActivityIndicator();
                    reloadTripList();
                }, bookingID, 2);
            }, 'Booking cancelled', 'See you again on your next booking', 'Done');
            break;
        case 3:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                showActivityIndicator();
                updateBookingStatus(function () {
                    localStorage.setItem(DRIVER_BOOKING, null);
                    hideCard();
                    showActivityIndicator();
                    reloadTripList();
                }, bookingID, 4);
            }, 'Booking Ongoing', 'You are on your way to your destination', 'Complete Booking');
            break;
        case 4:
            showInfoAlertWithConfirmAndCloseButtonsHTML(function () {
                showActivityIndicator();

                delay(function() {
                    localStorage.setItem(DRIVER_BOOKING, null);
                    hideCard();
                    showActivityIndicator();
                    reloadTripList();
                }, 1500);

            }, 'Booking finished', 'Hope you had a great ride experience', 'Done');
            break;
        default: break;
    }
}

function loadShuttlePage() {
    var _payload = {}

    shuttle_ride_card.addEventListener("click", onShuttleCardTap.bind(event, _payload), false);
    
    if(localStorage.hasOwnProperty(DRIVER_TRIP)){
        var localtrip = JSON.parse(localStorage.getItem(DRIVER_TRIP))
        if(localtrip != null){
            _hasCarpoolTrip = true;
            scan_qr_message_text.innerHTML = "You have created a carpool ride. Please cancel trip to use shuttle services.";
            scan_qr_message.style.visibility = "visible";
            
            setTimeout(() => {
                hideActivityIndicator();    
            }, 1000);   
        }
    }
    
    if(localStorage.hasOwnProperty(DRIVER_BOOKING)){
        try {
            var localbooking = JSON.parse(localStorage.getItem(DRIVER_BOOKING))
            
            if(localbooking != null){
                // var givenDate = moment(new Date(localbooking['createdAt'])).format("YYYY-MM-DD HH:mm");
                // var given =  moment(new Date(givenDate), "YYYY-MM-DD HH:mm");
                // var duration = moment.duration(given.diff(new Date())).asHours();
                // duration = duration - 8;
                
                var todayTime = getDateTime(true)
                var duration = getTimeDifference(localbooking['createdAt'], todayTime)
                
                console.log('local storage has a booking')
                console.log('has local storage duration', duration + ' > ' + _cacheExpiry);

                // one minute local storage life
                if(duration < _cacheExpiry){
                    localStorage.setItem(DRIVER_BOOKING, null)
                }else{
                    localbooking = localbooking.data

                    if(localbooking != null){
                        if(localbooking['booktype'] == 1){
                            activity_indicator.style.visibility = "visible";

                            setTimeout(() => {
                                activity_indicator.style.visibility = "collapse";
                            }, 1000);

                            _hasShuttleBooking = true;
                            if(localbooking['booktype'] == 1){
                                showCard(localbooking);
                            }

                            shuttle_trip_list.style.visibility = 'collapse';

                        }else if(localbooking['booktype'] == 0){
                            scan_qr_message.style.visibility = "visible";
                            _hasCarpoolBooking = true;  
                        }
                    }
                }
            }
        }catch(e){
            setTimeout(() => {
                hideActivityIndicator();    
            }, 1000);  
        }
    }

    if(!_hasShuttleBooking && !_hasCarpoolTrip){
        activity_indicator.style.visibility = "visible";
        
        // fetch user booking to update booking card
        var userObj = localStorage.getItem('user_login_data');
        userObj = JSON.parse(userObj);
        
        JUANDERSERVICE.userShuttleCheck(userObj['email'])
        .then(getResJSON)
        .then(function (data) {
            console.log(data['booking'])
            // console.log(data)
            if(data['trip'] == null && data['booking'] == null){
                // check if there is a recent booking
                reloadTripList();
            }

            if(data['booking'] != null){

                if(data['booking']['tripStatus'] === 4 || data['booking']['tripStatus'] === 2){
                    localStorage.setItem(DRIVER_BOOKING, null);
                    reloadTripList();
                }else{
                    if (data['booking'].status === 0 || data['booking'].status === 1 || data['booking'].status === 3) {
                        setTimeout(() => {

                            var localBooking = {
                                data: data['booking'],
                                createdAt: DATETIMESERVICE.getDateTime()
                            }

                            localStorage.setItem(DRIVER_BOOKING, JSON.stringify(localBooking));
                            shuttle_trip_list.style.visibility = 'collapse';
                            scan_qr_btn.style.visibility = "collapse";

                            if(data['booking']['booktype'] == 1){
                                showCard(data['booking']);
                            }

                            hideActivityIndicator();    
                        }, 1000);
                    }
                }
            } 
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = SHUTTLE_PAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
    }
}

function moveToIndexPage() {
    window.location.href = INDEX_SOURCE_LOCATION;
}

document.addEventListener('DOMContentLoaded', function () {
    checkAppVersion(function () {
        if (checkCurrentSession()) {
            loadShuttlePage();
        } else {
            moveToIndexPage();
        }
    }, function () {
        moveToIndexPage();
    });
});