var user_email = document.getElementById('user_email');
var login_button = document.getElementById('login_button');
var login_form = document.querySelector('.login-form');

var USER_LOGIN_EMAIL_KEY = 'email';
var hasError = false;

function highlightErrorInput() {
    user_email.style.borderColor = hasError ? 'red' : '#ced4da';
    document.querySelector('.invalid-feedback').style.display = hasError ? 'block' : 'none';
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
        console.log(localStorage.getItem(USER_LOGIN_EMAIL_KEY));
    } else {
        hasError = true;
        highlightErrorInput();
    }
}

user_email.addEventListener('keyup', onTyping);
login_button.addEventListener('click', onLogin);