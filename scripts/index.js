var user_email = document.getElementById('user_email');
var login_button = document.getElementById('login_button');
var login_form = document.querySelector('.login-form');

var USER_LOGIN_DATA_KEY = 'user_login_data';
var hasError = false;
var LOGIN_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/login';

function highlightErrorInput(message) {
    user_email.style.borderColor = hasError ? 'red' : '#ced4da';
    document.querySelector('.invalid-feedback').style.display = hasError ? 'block' : 'none';
    document.querySelector('.invalid-feedback').innerHTML = hasError ? message : '';
}
function checkCurrentSession() {
    var user_login_data = localStorage.getItem(USER_LOGIN_DATA_KEY);

    if (user_login_data) {
        moveToHomepage();
    } else {
        loadPageInDefault();
    }
}
function moveToHomepage() {
    window.location.href = '/pages/carpool.html';
}

function loadPageInDefault() {
    document.querySelector('.login-page-container').style.display = 'block';
    login_button.disabled = true;
}

function login(email) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    };

    login_button.disabled = true;

    fetch(LOGIN_API_ENDPOINT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            login_button.disabled = false;

            if (data.code === 400) {
                hasError = true;
                highlightErrorInput('Plase enter email with existing user');
            } else {
                localStorage.setItem(USER_LOGIN_DATA_KEY, JSON.stringify(data));
                moveToHomepage();
            }
        })
        .catch(function (err) {
            console.error(err);
            alert('ERROR: ' + err);
        });
}

function onTyping(e) {
    var email = e.currentTarget.value;

    if (email.length > 0 && event.key !== "Enter") {
        login_button.disabled = false;
        hasError = false;
        highlightErrorInput(null);
    } else {
        login_button.disabled = true;
    }
}
function onLogin() {
    var emailPattern = /(@cebupacificair.com)/gi;
    var email = user_email.value;

    if (emailPattern.test(email) === true) {
        login(email);
    } else {
        hasError = true;
        highlightErrorInput('Plase enter a valid email');
    }
}

user_email.addEventListener('keyup', onTyping);
user_email.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        onLogin();
    }
});
login_button.addEventListener('click', onLogin);

document.addEventListener('DOMContentLoaded', function () {
    checkCurrentSession(); 
});