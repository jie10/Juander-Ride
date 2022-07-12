/** LOCAL STORAGE */
var USER_LOGIN_DATA_KEY = 'user_login_data';
var FROM_INDEX_TO_ROUTE_KEY = 'from_index_to_route_key';
var DRIVER_TRIP = 'driver_trip';
var DRIVER_BOOKING = 'user_booking';
var CURRENT_APP_VERSION_KEY = 'current_app_version';
var DRIVER_TRIP_KEY = 'driver_trip';
var SHUTTLE_TRIPS_KEY = 'shuttle_trips';
var SHUTTLE_BOOKING_KEY = 'shuttle_booking';
var USER_BOOKING_KEY = 'user_booking';
var NEW_FEATURES_LOADED_KEY = 'is_new_features_loaded';
var IS_ADVERTISEMENTS_LOADED_KEY = 'is_advertisements_loaded';

/** CONSTANT VALUES */
var DELAY_TIME_IN_MILLISECONDS = 1000;

/** SOURCE LOCATION */
var CARPOOLPAGE_SOURCE_LOCATION = './pages/carpool.html';
var LOGIN_SOURCE_LOCATION = './pages/login.html';

function moveToCarpoolPage() {
    delay(function () {
        window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
    }, DELAY_TIME_IN_MILLISECONDS);
}

function moveToLoginPage() {
    delay(function () {
        window.location.href = LOGIN_SOURCE_LOCATION;
    }, DELAY_TIME_IN_MILLISECONDS);
}

document.addEventListener('DOMContentLoaded', function () {
    var current_user_session = checkCurrentSession();

    localStorage.setItem(FROM_INDEX_TO_ROUTE_KEY, true);

    if (current_user_session) {
        moveToCarpoolPage();
    } else {
        localStorage.removeItem(USER_LOGIN_DATA_KEY);
        localStorage.removeItem(CURRENT_APP_VERSION_KEY);
        localStorage.removeItem(USER_BOOKING_KEY);
        localStorage.removeItem(DRIVER_TRIP_KEY);
        localStorage.removeItem(SHUTTLE_TRIPS_KEY);
        localStorage.removeItem(SHUTTLE_BOOKING_KEY);
        localStorage.removeItem(IS_ADVERTISEMENTS_LOADED_KEY);
        localStorage.removeItem(NEW_FEATURES_LOADED_KEY);
        moveToLoginPage();
    }
});