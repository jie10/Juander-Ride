var user_email = document.getElementById('user_email');
var login_button = document.getElementById('login_button');
var login_form = document.querySelector('.login-form');

var USER_LOGIN_EMAIL_KEY = 'email';
var hasError = false;

function highlightErrorInput() {
    user_email.style.borderColor = hasError ? 'red' : '#ced4da';
    document.querySelector('.invalid-feedback').style.display = hasError ? 'block' : 'none';
}
function checkCurrentSession() {
    var email = localStorage.getItem(USER_LOGIN_EMAIL_KEY);

    if (email) {
        moveToHomepage();
    } else {
        document.querySelector('.login-page-container').style.display = 'block';
    }
}
function moveToHomepage() {
    window.location.href = '/pages/carpool.html';
}
function onTyping() {
    hasError = false;
    highlightErrorInput();
}
function onLogin() {
    var emailPattern = /(@cebupacificair.com)/gi;
    var email = user_email.value;

    if (emailPattern.test(email) === true && email.length > 0) {
        localStorage.setItem(USER_LOGIN_EMAIL_KEY, email);
        moveToHomepage();
    } else {
        hasError = true;
        highlightErrorInput();
    }
}

user_email.addEventListener('keydown', onTyping);
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