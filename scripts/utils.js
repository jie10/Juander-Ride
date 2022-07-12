/** LOCAL STORAGE */
var CURRENT_APP_VERSION_KEY = 'current_app_version';
var USER_LOGIN_DATA_KEY = 'user_login_data';

/** API ENDPOINT */
var CHECK_APP_VERSION_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/version';

/** SOURCE LOCATION */
var INDEX_SOURCE_LOCATION = '../index.html';

function checkAppVersion (successCallback, failedCallback) {
    fetch(CHECK_APP_VERSION_API_ENDPOINT)
        .then(function (result) {
            return result.json()
        })
        .then(function(data) {
            var currect_app_version_from_server = data.version;
            var current_app_version = localStorage.getItem(CURRENT_APP_VERSION_KEY) ;

            if (currect_app_version_from_server && !current_app_version) {
                localStorage.setItem(CURRENT_APP_VERSION_KEY, currect_app_version_from_server);
                successCallback();
            } else if (currect_app_version_from_server && (currect_app_version_from_server === parseInt(current_app_version))) {
                successCallback();
            } else {
                localStorage.clear();
                failedCallback();
            }
        })
        .catch(function (err) {
            console.error(err);
            showErrorAlertWithConfirmButton(function () {
                window.location.href = INDEX_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}

function checkCurrentSession() {
    return localStorage.getItem(USER_LOGIN_DATA_KEY) ? true : false;
}