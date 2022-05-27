var my_trips_button = document.getElementById('my_trips_button');
var my_bookings_button = document.getElementById('my_bookings_button');
var settings_button = document.getElementById('settings_button');
var logout_button = document.getElementById('logout_button');

var USER_LOGIN_EMAIL_KEY = 'email';

function moveToLoginpage() {
    window.location.href = '../index.html';
}
function checkCurrentSession() {
    var email = localStorage.getItem(USER_LOGIN_EMAIL_KEY);

    if (email) {
        document.querySelector('.account-page-container').style.display = 'block';
        // TODO - load current user details here from API
    } else {
        moveToLoginpage();
    }
}
function logoutCurrentSession() {
    localStorage.removeItem(USER_LOGIN_EMAIL_KEY);
    moveToLoginpage();
}

function onMyTrips() {
    // TODO - move to my trips component or page
}
function onMyBookings() {
    // TODO - move to my bookings component or page
}
function onSettings() {
    // TODO - move to settings component or page
}
function onLogout() {
    logoutCurrentSession();
}

my_trips_button.addEventListener('click', onMyTrips);
my_bookings_button.addEventListener('click', onMyBookings);
settings_button.addEventListener('click', onSettings);
logout_button.addEventListener('click', onLogout);

document.addEventListener('DOMContentLoaded', function () {
    checkCurrentSession();
});