/** LOCAL STORAGE */
var USER_LOGIN_DATA_KEY = 'user_login_data';

/** CONSTANT VALUES */
var DELAY_TIME_IN_MILLISECONDS = 1000;

/** API ENDPOINTS */
var LOGIN_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/login';
var SIGN_UP_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/register';

/** SOURCE LOCATION */
var HOMEPAGE_SOURCE_LOCATION = '/';
var CARPOOLPAGE_SOURCE_LOCATION = '../pages/carpool.html';

/** DOM ELEMENTS */
var login_viewcontroller = document.getElementById('login_viewcontroller');
var sign_up_viewcontroller = document.getElementById('sign_up_viewcontroller');

var user_email = document.getElementById('user_email');
var user_sign_up_email = document.getElementById('user_sign_up_email');
var user_sign_up_mobile_number = document.getElementById('user_sign_up_mobile_number');
var user_sign_up_location = document.getElementById('user_sign_up_location');

var sign_up_view_button = document.getElementById('sign_up_view_button');
var back_to_login_view_button = document.getElementById('back_to_login_view_button');
var login_button = document.getElementById('login_button');
var sign_up_button = document.getElementById('sign_up_button');


function highlightLoginErrorInput(errEmail) {
    user_email.style.borderColor = errEmail ? 'red' : '#ced4da';

    user_email.parentElement.querySelector('.invalid-feedback').style.display = errEmail ? 'block' : 'none';
    user_email.parentElement.querySelector('.invalid-feedback').innerHTML = errEmail ? 'Plase enter a valid email' : '';
}
function highlightRegisterErrorInput(errEmail, errMobileNumber, errLocation) {
    user_sign_up_email.style.borderColor = errEmail ? 'red' : '#ced4da';
    user_sign_up_email.parentElement.querySelector('.invalid-feedback').style.display = errEmail ? 'block' : 'none';
    user_sign_up_email.parentElement.querySelector('.invalid-feedback').innerHTML = errEmail ? 'Plase enter a valid email' : '';

    user_sign_up_mobile_number.style.borderColor = errMobileNumber ? 'red' : '#ced4da';
    user_sign_up_mobile_number.parentElement.querySelector('.invalid-feedback').style.display = errMobileNumber ? 'block' : 'none';
    user_sign_up_mobile_number.parentElement.querySelector('.invalid-feedback').innerHTML = errMobileNumber ? 'Please choose a valid mobile number' : '';

    user_sign_up_location.style.borderColor = errLocation ? 'red' : '#ced4da';
    user_sign_up_location.parentElement.querySelector('.invalid-feedback').style.display = errLocation ? 'block' : 'none';
    user_sign_up_location.parentElement.querySelector('.invalid-feedback').innerHTML = errLocation ? 'Please indicate your current location' : '';
}

function checkExistingSession() {
    var user_login_data = localStorage.getItem(USER_LOGIN_DATA_KEY);

    if (user_login_data) {
        moveToHomepage();
    } else {
        loadPageInDefault();
    }
}

function moveToHomepage() {
    window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
}

function loadPageInDefault() {
    login_viewcontroller.style.display = 'block';
    sign_up_viewcontroller.style.display = 'none';
    login_button.disabled = true;
    sign_up_button.disabled = true;
}

function login(email) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    };

    fetch(LOGIN_API_ENDPOINT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                if (data.code === 400) {
                    showErrorAlertWithConfirmButton(function () {
                        hideActivityIndicator();

                        user_email.disabled = false;
                        login_button.disabled = false;
                    }, 'Error ' + data.code, data.message, 'Close');
                } else {
                    localStorage.setItem(USER_LOGIN_DATA_KEY, JSON.stringify(data));
                    moveToHomepage();
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
function register(email, mobileNumber, location) {
    var payload = {
        email: email,
        mobileNumber: mobileNumber,
        address: location
    }
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(SIGN_UP_API_ENDPOINT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                hideActivityIndicator();

                if (data.code === 400 || data.code === 409) {
                    showErrorAlertWithConfirmButton(function () {
                        sign_up_button.disabled = false;
                        back_to_login_view_button.disabled = false;
                        user_sign_up_email.disabled = false;
                        user_sign_up_mobile_number.disabled = false;
                        user_sign_up_location.disabled = false;
                    }, 'Error ' + data.code, data.message, 'Close');
                } else {
                    loadPageInDefault();
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

function onLoginView() {
    login_viewcontroller.style.display = 'block';
    sign_up_viewcontroller.style.display = 'none';
    user_sign_up_email.value = '';
    user_sign_up_mobile_number.value = '';
    user_sign_up_location.value = '';
    sign_up_button.disabled = true;
}
function onRegisterView() {
    login_viewcontroller.style.display = 'none';
    sign_up_viewcontroller.style.display = 'block';
    user_email.value = '';
    login_button.disabled = true;

    new Cleave(user_sign_up_mobile_number, {
        numericOnly: true,
        blocks: [0, 2, 3, 4],
        delimiters: ['9', ' ', ' ']
    });
}

function onLoginKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        onLogin();
    }
}
function onRegisterKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        onRegister();
    }
}

function onLoginTyping(e) {
    var email = e.currentTarget.value;

    if (email.length > 0 && event.key !== "Enter") {
        login_button.disabled = false;
        highlightLoginErrorInput(false);
    } else {
        login_button.disabled = true;
    }
}
function onRegisterTyping() {
    var requiredFields = user_sign_up_email.value.length > 0 && user_sign_up_mobile_number.value.length > 0 && user_sign_up_location.value.length > 0;

    if (requiredFields && event.key !== "Enter") {
        sign_up_button.disabled = false;
        highlightRegisterErrorInput(false, false, false);
    } else {
        sign_up_button.disabled = true;
    }
}

function onLogin() {
    var emailPattern = /(@cebupacificair.com)/gi;
    var email = user_email.value;

    if (emailPattern.test(email) === true) {
        user_email.disabled = true;
        login_button.disabled = true;
        showActivityIndicator();

        login(email);
    } else {
        highlightLoginErrorInput(true);
    }
}
function onRegister() {
    var emailPattern = /(@cebupacificair.com)/gi;
    var phonePattern = /(9[0-9]{2}\s([0-9]{3}\s)[0-9]{4})/;
    var numberPattern = /(9[0-9]{9})/g;
    var email = user_sign_up_email.value;
    var mobile_number = user_sign_up_mobile_number.value;
    var location = user_sign_up_location.value;
    var isValidEmail = emailPattern.test(email) === true;
    var isValidMobileNumber = phonePattern.test(mobile_number) === true || numberPattern.test(mobile_number);
    var isValidLocation = location && location.length > 0;

    if (isValidEmail & isValidMobileNumber & isValidLocation ) {
        showActivityIndicator();
        sign_up_button.disabled = true;
        back_to_login_view_button.disabled = true;
        user_sign_up_email.disabled = true;
        user_sign_up_mobile_number.disabled = true;
        user_sign_up_location.disabled = true;

        register(email, mobile_number, location);
    } else if (!isValidEmail) {
        highlightRegisterErrorInput(true, false, false);
    } else if (!isValidMobileNumber) {
        highlightRegisterErrorInput(false, true, false);
    } else if (!isValidLocation) {
        highlightRegisterErrorInput(false, false, true);
    } else {
        highlightRegisterErrorInput(true, true, true);
    }
}


sign_up_view_button.addEventListener('click', onRegisterView);
back_to_login_view_button.addEventListener('click', onLoginView);

user_email.addEventListener("keypress", onLoginKeyPress);
user_sign_up_email.addEventListener('keypress', onRegisterKeyPress);
user_sign_up_mobile_number.addEventListener('keypress', onRegisterKeyPress);
user_sign_up_location.addEventListener('keypress', onRegisterKeyPress);

user_email.addEventListener('keyup', onLoginTyping);
user_sign_up_email.addEventListener('keyup', onRegisterTyping);
user_sign_up_mobile_number.addEventListener('keyup', onRegisterTyping);
user_sign_up_location.addEventListener('keyup', onRegisterTyping);

login_button.addEventListener('click', onLogin);
sign_up_button.addEventListener('click', onRegister);


document.addEventListener('DOMContentLoaded', function () {
    checkExistingSession(); 
});