/** GET COMPONENTS */
var scan_qr_btn = document.getElementById('scan_qr_btn');
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

var activity_indicator = document.getElementById('activity_indicator');

/** ADD EVENTS */
scan_qr_btn.addEventListener('click', onScanQrCode);
scanner_close_btn.addEventListener('click', onScannerClose);
scanner_confirm_btn.addEventListener('click', onScannerConfirm);
scanner_continue_btn.addEventListener('click', onScannerContinue);

var _scanner;
var _payload;

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
    
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "tripID": _payload['_id'],
            "email": "randelljoseph.ramirez@cebupacificair.com",
            "ridername": "Randell D. Ramirez",
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
                console.log(data);
                
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
    
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            var html5QrCode = new Html5Qrcode("scan_ticket_reader");
            var cameraId = devices[0].id;
            var config = {
                fps: 10,
                qrbox: { width: 180, height: 180 },
                aspectRatio: 1.7777778
            };

            _scanner.stop().then((ignore) => {
              // QR Code scanning is stopped.
                _payload = undefined;
                scan_qr_btn.style.backgroundColor = "#cccccc";
                scanner_viewcontroller.style.visibility = "collapse";
            }).catch((err) => {
              // Stop failed, handle it.
            });
        } else {
            console.log("no cameras found!");
        }
    })
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
                var html5QrCode = new Html5Qrcode("scan_ticket_reader");
                _scanner = html5QrCode;
                // html5QrCode.clear();
                var cameraId = devices[0].id;
                var config = {
                    fps: 10,
                    qrbox: { width: 180, height: 180 },
                    aspectRatio: 1.7777778
                };

                activity_indicator.style.visibility = "collapse";
                html5QrCode.start(
                    { facingMode: { exact: "environment"} }, 
                    config,
                    function (decodedText, decodedResult) {
                        if(decodedText != lastResult){
                            lastResult = decodedText;
                            console.log(decodedText);
                            // html5QrCode.clear();

                            html5QrCode.stop().then((ignore) => {
                              // QR Code scanning is stopped.
                                console.log("stop");
                                html5QrCode.clear();
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


var onTripSelect = function(event, payload){
    _payload = event;
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
    trip.addEventListener("click", onTripSelect.bind(event, payload), false);
    
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
    activity_indicator.style.visibility = "visible";
    reloadTripList();
});