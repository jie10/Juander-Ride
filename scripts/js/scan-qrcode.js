"use strict";
var resultContainer = document.getElementById('qr-code-results');
var lastResult, countResults = 0;
var html5QrCode = new Html5Qrcode("qr-code-scanner", { formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE] });
function displayQRCodeScanToRideSuccess() {
    var title = 'Logged Successfully!';
    var text = 'Enjoy your trip and see you in the office';
    var status = 'success';
    showAlertStatus(title, text, status);
}
function displayCamUndetectedError() {
    var title = 'No Camera detected!';
    var text = 'Please check your device and try again later';
    var status = 'error';
    showAlertStatus(title, text, status);
    displayUserQRCodeContainer();
}
function displayCameraDisabledError() {
    var title = 'Camera disabled!';
    var text = 'Please check your settings, allow camera and refresh page to use this feature';
    var status = 'error';
    showAlertStatus(title, text, status);
    displayUserQRCodeContainer();
}
function displayServerError() {
    var title = 'Server error!';
    var text = 'Please refresh page or try again later';
    var status = 'error';
    showAlertStatus(title, text, status);
    displayUserQRCodeContainer();
}
function saveAsRideLog(shuttleServiceId) {
    fetch(BASE_LOCAL_URL + "/user/ride", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringifyJSON({ "email": retrieveCurrentSession(), "shuttle_service_id": shuttleServiceId })
    })
        .then(function (result) {
        return result.json();
    })
        .then(function (res) {
        if (res.status === 200) {
            var data = res.data;
            if (data) {
                stopScanUserQRCodeScan();
                displayQRCodeScanToRideSuccess();
            }
            else {
                stopScanUserQRCodeScan();
                displayServerError();
            }
        }
        else {
            destroyCurrentSession();
            goToLoginPage();
        }
    })
        .catch(function (error) {
        showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
        console.error(error);
    });
}
function scanQRCode(cameraId) {
    var config = {
        fps: 10,
        qrbox: { width: 180, height: 180 }
    };
    html5QrCode.start(cameraId, config, function (decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            var result = JSON.parse(decodedText);
            if (result) {
                startUserQRCodeScan(result.email, result.vehicle_id, result.access_role);
            }
        }
    })
        .catch(function (err) {
        console.log(err);
        stopUserQRCodeScan();
        displayServerError();
    });
}
function stopScanUserQRCodeScan() {
    html5QrCode.stop().then(function (ignore) {
        stopUserQRCodeScan();
    }).catch(function (err) {
        console.log(err);
        stopUserQRCodeScan();
        displayServerError();
    });
}
function scanUserQRcode() {
    Html5Qrcode.getCameras().then(function (devices) {
        if (devices && devices.length) {
            var cameraId = devices[0].id;
            buttonScanQRCode.disabled = true;
            hideUserQRCodeContainer();
            showPageLoader();
            delay(function () {
                buttonStopScanQRCode.disabled = false;
                hidePageLoader();
                hideUserScanQRCodeButton();
                showStopUserScanQRCodeButton();
                displayRideQRCodeContainer();
                scanQRCode(cameraId);
            }, 1500);
        }
        else {
            stopUserQRCodeScan();
            displayCamUndetectedError();
        }
    }).catch(function (err) {
        var isNotAllowed = /NotAllowed/gi.test(err);
        if (isNotAllowed) {
            stopUserQRCodeScan();
            displayCameraDisabledError();
        }
        else {
            stopUserQRCodeScan();
            displayServerError();
        }
    });
}
