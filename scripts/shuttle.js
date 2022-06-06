/** GET COMPONENTS */
var DRIVER_TRIP = 'driver_trip';
var DRIVER_BOOKING = 'user_booking';

var scan_qr_btn = document.getElementById('scan_qr_btn');
var scan_qr_btn_container = document.getElementById('scan_qr_btn_container');
var scan_qr_message = document.getElementById('scan_qr_message');
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

var shuttle_ride_card = document.getElementById('shuttle_ride_card');
var shuttle_ride_card_title = document.getElementById('shuttle_ride_card_title');
var shuttle_ride_card_datetime = document.getElementById('shuttle_ride_card_datetime');
var shuttle_ride_card_destination = document.getElementById('shuttle_ride_card_destination');
var shuttle_ride_card_seats = document.getElementById('shuttle_ride_card_seats');
var shuttle_ride_card_status = document.getElementById('shuttle_ride_card_status');

var activity_indicator = document.getElementById('activity_indicator');

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

/** FUNCTIONS */
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
    reloadTripList();
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
                    scanner_success_viewcontroller_title.innerHTML = "Oops!";
                    scanner_success_viewcontroller_message.innerHTML = data['message'];
                }
                
                setTimeout(() => {
                    scanner_confirm_viewcontroller.style.visibility = "collapse";
                    scanner_success_viewcontroller.style.visibility = "visible";
                    activity_indicator.style.visibility = "collapse";
                }, 1500);
            }
        })
        .catch(function (err) {
            console.error(err);
            alert('ERROR: ' + err);
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
        console.log("fail");
    });
}

function onScanQrCode (e) {
    activity_indicator.style.visibility = "visible";
    
    if(_payload){
       var lastResult = "";
        var countResults = 0;
        console.log(lastResult);
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
                            console.log(decodedText);
                            // html5QrCode.clear();

                            _scanner.stop().then((ignore) => {
                              // QR Code scanning is stopped.
                                console.log("stop");
                                _scanner.clear();
                                scanner_viewcontroller.style.visibility = "collapse";
                                
                                scanner_confirm_viewcontroller_title.innerHTML = _payload['fullname']
                                scanner_confirm_viewcontroller_shuttle.innerHTML = _payload['fullname']
                                scanner_confirm_viewcontroller_origin.innerHTML = "AOC Pasay"
                                scanner_confirm_viewcontroller_destination.innerHTML = _payload['origin']
                                
                                scanner_confirm_viewcontroller.style.visibility = "visible";
                                
                            }).catch((err) => {
                              // Stop failed, handle it.
                                console.log("fail");
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


var onShuttleCardTap = function(event, payload){
    console.log('onShuttleCardTap');
}


var onTripSelect = function(event, payload){
    _payload = event;
    scan_qr_btn.style.pointerEvents = null;
    scan_qr_btn.style.backgroundColor = "#05a5df";
}

function reloadTripList() {
    _payload = undefined;
    scan_qr_btn.style.visibility = "collapse";
    scan_qr_btn.style.backgroundColor = "#cccccc";
    shuttle_trip_list.innerHTML = ''
    
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
        if(data != undefined){
            if(data.length > 0){
                // populate shuttle list
                data.map(trip => {
                    addTrip(trip)
                })

                scan_qr_btn.style.visibility = "visible"
                activity_indicator.style.visibility = "collapse";
            }else{
                shuttle_trip_container.innerHTML = "<p style='text-align: center; margin-top: 32px;'>No shuttle trips found.</p>"
                activity_indicator.style.visibility = "collapse";
            }  
        }
    })
    .catch(function (err) {
        console.error(err);
        alert('ERROR: ' + err);
    });
}

function addTrip(payload) {
    var trip = document.createElement("li");
    trip.style = "padding-top: 6px; padding-bottom: 6px;"
    
    if(!_hasCarpoolBooking){
        trip.addEventListener("click", onTripSelect.bind(event, payload), false);
    }
    
    trip.innerHTML = "<div style='display: flex; height: 100px;  border-radius: 12px; border: 1px solid #dfdfdf;'>"
    + "<div style='flex-grow: 1;'>"
    + "<img style='border-radius: 8px; width: 40px; margin-top: 16px; margin-left: 24px;' src='../images/sample/no-avatar.png'/>"
    + "</div>"
    + "<div style='flex-grow: 4;'>"
    + "<p style='padding: 16px 0 0 0; margin: 0; line-height: 1em; font-size: 1.2rem; font-weight: bold;'>" + payload['fullname'] + "</p>"
    + "<p style='padding: 0; margin: 0; line-height: 1.1em; font-size: 0.8rem;'>" + payload['origin'] + "</p>"
    + "<p style='padding: 8px 0 0 0; margin: 0; line-height: 1em; font-size: 0.8rem;'><span style='font-weight: bold;'>Departure:</span> 6:30pm</p>"
    + "</div>"
    + "<div style='flex-grow: 2; text-align: end'>"
    + "<p style='margin: 18px 24px 0 0; padding: 0; line-height: 1em; font-size: 1.8rem; font-weight: bold;'>" + payload['seats'] + "</p>"
    + "<p style='padding: 0; margin: 0; line-height: 1em; font-size: 0.8rem; margin-right: 24px;'>seats</p>"
    + "</div>"
    + "</div>"

    shuttle_trip_list.appendChild(trip);
}

document.addEventListener('DOMContentLoaded', function () {
    var _payload = {}
    shuttle_ride_card.addEventListener("click", onShuttleCardTap.bind(event, _payload), false);
    
    if(localStorage.hasOwnProperty(DRIVER_TRIP)){
        var localtrip = localStorage.getItem(DRIVER_TRIP)
        if(localtrip != 'null'){
            console.log('has trip')
        }
    }
    
    if(localStorage.hasOwnProperty(DRIVER_BOOKING)){
        var localbooking = localStorage.getItem(DRIVER_BOOKING)
        if(localbooking != 'null'){
            var localbooking = JSON.parse(localStorage.getItem(DRIVER_BOOKING))
            if(localbooking['booktype'] == 1){
                console.log(localbooking)
                activity_indicator.style.visibility = "visible";
                
                setTimeout(() => {
                    activity_indicator.style.visibility = "collapse";
                }, 1000);
                
                
                _hasShuttleBooking = true;
                
                shuttle_ride_card_title.innerHTML = localbooking['drivername']
                
                var timeFromNowFormat = moment(localbooking.departTime).utc().format('MMMM D YYYY  h:mm a');
                var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
                
                shuttle_ride_card_datetime.innerHTML = (timeFromNow) + ' ' + timeFromNowFormat;
                shuttle_ride_card_destination.innerHTML = localbooking['destination']
                shuttle_ride_card_seats.innerHTML = localbooking['seats'] +"/"+ localbooking['seatCount'] + " seats"
                shuttle_ride_card_status.innerHTML = "confirmed"
                
                shuttle_ride_card.style.visibility = 'visible';
                shuttle_trip_list.style.visibility = 'collapse';
                
            }else if(localbooking['booktype'] == 0){
                scan_qr_message.style.visibility = "visible";
                _hasCarpoolBooking = true;
                console.log('has carpool booking')    
            }
        }
    }
    
    if(!_hasShuttleBooking){
        activity_indicator.style.visibility = "visible";
        reloadTripList();
    }
});