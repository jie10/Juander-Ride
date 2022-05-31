var CHECK_APP_VERSION_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/version';
var CURRENT_APP_VERSION_KEY = 'current_app_version';
var USER_LOGIN_DATA_KEY = 'user_login_data';

function checkAppVersion (callback) {
    fetch(CHECK_APP_VERSION_API_ENDPOINT)
        .then(function (result) {
            return result.json()
        })
        .then(function(data) {
            var currect_app_version_from_server = data.version;
            var current_app_version = localStorage.getItem(CURRENT_APP_VERSION_KEY) ;

            if (currect_app_version_from_server && !current_app_version) {
                localStorage.setItem(CURRENT_APP_VERSION_KEY, currect_app_version_from_server);
                callback();
            } else if (currect_app_version_from_server && (currect_app_version_from_server === parseInt(current_app_version))) {
                callback();
            } else {
                localStorage.removeItem(CURRENT_APP_VERSION_KEY);
                localStorage.removeItem(USER_LOGIN_DATA_KEY);
                window.location.href = '/';
            }
        })
        .catch(function (err) {
            console.error(err);
            Swal.fire({
                title: 'Error',
                text: 'Internal server error',
                confirmButtonText: 'Refresh',
            }).then((result) => {
                if (result.isConfirmed) {
                    history.back();
                }
            });
        });
}