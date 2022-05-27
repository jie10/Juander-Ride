var my_trips_button = document.getElementById('my_trips_button');
var my_bookings_button = document.getElementById('my_bookings_button');
var settings_button = document.getElementById('settings_button');
var logout_button = document.getElementById('logout_button');

var USER_LOGIN_DATA_KEY = 'user_login_data';

function moveToLoginpage() {
    window.location.href = '../index.html';
}
function checkCurrentSession() {
    var user_login_data = localStorage.getItem(USER_LOGIN_DATA_KEY);

    if (user_login_data) {
        document.querySelector('.account-page-container').style.display = 'block';
        loadUserDetails();
    } else {
        moveToLoginpage();
    }
}
function logoutCurrentSession() {
    localStorage.removeItem(USER_LOGIN_DATA_KEY);
    moveToLoginpage();
}

function loadUserDetails() {
    var user_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

    document.querySelector('.user-name').innerHTML = user_data.displayName ? user_data.displayName : user_data.email;
    document.querySelector('.user-role').innerHTML = user_data.jobTitle ? user_data.jobTitle : 'CEB employee';
    document.querySelector('.user-position').innerHTML = user_data.jobTitle ? user_data.jobTitle : 'Cebu Pacifir Air, Inc.';
    document.querySelector('.points-count').innerHTML = user_data.points ? user_data.points : 0;
    document.querySelector('.badges-count').innerHTML = user_data.badges ? user_data.badges : 0;
    document.querySelector('.items-count').innerHTML = user_data.items ? user_data : 0;
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