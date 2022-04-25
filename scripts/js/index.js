"use strict";
var pageLogin = document.querySelector('.login-page');
var pageHome = document.querySelector('.home-page');
var navigationSidebarContainer = document.querySelector('.navigation-side-bar-container');
var mapNavigationContainer = document.querySelector('.map-navigation-container');
var searchServiceContainer = document.querySelector('.search-service-container');
var viewRideLogsContainer = document.querySelector('.view-ride-logs-container');
var userProfileContainer = document.querySelector('.user-profile-container');
var userQRCodeContainer = document.querySelector('.user-qr-code-container');
var rideQRCodeContainer = document.querySelector('.ride-qr-code-container');
var loaderPage = document.getElementById('page_loader');
var displayUserName = document.getElementById('display_user_name');
var formLogin = document.querySelector('.login-form');
var formRegister = document.querySelector('.register-form');
var userQRCode = document.getElementById('user_qr_code');
var userDetails = document.querySelector('.qr-details');
var userDisplayName = document.getElementById('user_display_name');
var userDisplayDepartment = document.getElementById('user_display_department');
var userDisplayJobRole = document.getElementById('user_display_jobe_role');
var userDisplayPlateNumber = document.getElementById('user_display_plate_number');
var updateDisplayAvatarImage = document.getElementById('update_display_avatar_image');
var inputLoginEmail = document.getElementById('login_email');
var inputLoginPassword = document.getElementById('login_password');
var inputUpdateEmployeeID = document.getElementById('update_employee_id');
var inputUpdateDisplayName = document.getElementById('update_display_name');
var inputUpdateDepartment = document.getElementById('update_department');
var inputUpdateJobRole = document.getElementById('update_job_role');
var inputUpdatePointOfOrigin = document.getElementById('update_point_of_origin');
var inputUpdateEmail = document.getElementById('update_email');
var inputUpdatePassword = document.getElementById('update_password');
var inputSearchRideQuery = document.getElementById('search_ride_query');
var checkboxFavailYes = document.getElementById('favail_yes_checkbox');
var checkboxFavailNo = document.getElementById('favail_no_checkbox');
var checkboxFdaysMon = document.getElementById('fdays_mon_checkbox');
var checkboxFdaysTues = document.getElementById('fdays_tues_checkbox');
var checkboxFdaysWed = document.getElementById('fdays_wed_checkbox');
var checkboxFdaysThurs = document.getElementById('fdays_thurs_checkbox');
var checkboxFdaysFri = document.getElementById('fdays_fri_checkbox');
var selectorUpdateOnsiteSchedule = document.getElementById('update_onsite_schedule');
var selectorUpdateSpecificOnsiteDays = document.getElementById('update_specific_onsite_days');
var buttonGoToLoginForm = document.getElementById('go_to_login_form');
var buttonGoToRegiterForm = document.getElementById('go_to_register_form');
var buttonUserLogin = document.getElementById('login_button');
var buttonUserRegister = document.getElementById('register_button');
var buttonNavigationMenu = document.getElementById('navigation_menu_button');
var buttonCloseNavSidebar = document.getElementById('close_nav_side_bar_button');
var buttonUserLogout = document.getElementById('logout_button');
var buttonUserHome = document.getElementById('home_button');
var buttonUserProfile = document.getElementById('profile_button');
var buttonScanQRCode = document.getElementById('scan_qr_code_button');
var buttonStopScanQRCode = document.getElementById('stop_scan_qr_code_button');
var buttonStartScanQRCode = document.getElementById('scan_qr_code_button');
var buttonSearchService = document.getElementById('search_service_button');
var buttonViewRideLogs = document.getElementById('view_ride_logs_button');
var buttonCloseSearchService = document.getElementById('close_search_service_modal_button');
var buttonCloseViewRideLogs = document.getElementById('close_view_ride_logs_modal_button');
var buttonUpdateProfile = document.getElementById('update_profile_button');
var BASE_LOCAL_URL = 'http://localhost:8000';
var q = '';
var favail = '';
var fdays = [];
var delay = function (callback, DELAY_TIMEOUT_IN_MILLISECONDS) {
    setTimeout(callback, DELAY_TIMEOUT_IN_MILLISECONDS);
};
var capitalizeString = function (str) { return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase(); };
var capitalizeMultipleStrings = function (str, separator, joiner) { return str.split(separator).map(function (s) { return capitalizeString(s); }).join(joiner); };
var stringifyJSON = function (obj) { return JSON.stringify(obj); };
var parseJSON = function (str) { return JSON.parse(str); };
var retrieveCurrentSession = function () { return localStorage.getItem('user'); };
var storeCurrentSession = function (user) { return localStorage.setItem('user', user); };
var destroyCurrentSession = function () { return localStorage.removeItem('user'); };
var showLoginForm = function () {
    formLogin.style.display = "block";
};
var hideLoginForm = function () {
    formLogin.style.display = "none";
};
var showRegisterForm = function () {
    formRegister.style.display = "block";
};
var hideRegisterForm = function () {
    formRegister.style.display = "none";
};
var showNavSidebar = function () {
    navigationSidebarContainer.style.display = "block";
};
var hideNavSidebar = function () {
    navigationSidebarContainer.style.display = "none";
};
var showLoginPage = function () {
    pageLogin.style.display = "block";
};
var hideLoginPage = function () {
    pageLogin.style.display = "none";
};
var showHomepage = function () {
    pageHome.style.display = "block";
};
var hideHomepage = function () {
    pageHome.style.display = "none";
};
var showMapNavigationContainer = function () {
    mapNavigationContainer.style.display = "block";
};
var hideMapNavigationContainer = function () {
    mapNavigationContainer.style.display = "none";
};
var showSearchServiceContainer = function () {
    searchServiceContainer.style.display = "block";
};
var hideSearchServiceContainer = function () {
    searchServiceContainer.style.display = "none";
};
var showUserProfileContainer = function () {
    userProfileContainer.style.display = "block";
};
var hideUserProfileContainer = function () {
    userProfileContainer.style.display = "none";
};
var showRideQRCodeContainer = function () {
    rideQRCodeContainer.style.display = "block";
};
var hideRideQRCodeContainer = function () {
    rideQRCodeContainer.style.display = "none";
};
var showUserQRCodeContainer = function () {
    userQRCodeContainer.style.display = "block";
};
var hideUserQRCodeContainer = function () {
    userQRCodeContainer.style.display = "none";
};
var showViewRideLogsContainer = function () {
    viewRideLogsContainer.style.display = "block";
};
var hideViewRideLogsContainer = function () {
    viewRideLogsContainer.style.display = "none";
};
var showUserScanQRCodeButton = function () {
    buttonScanQRCode.style.display = "flex";
};
var hideUserScanQRCodeButton = function () {
    buttonScanQRCode.style.display = "none";
};
var showStopUserScanQRCodeButton = function () {
    buttonStopScanQRCode.style.display = "flex";
};
var hideStopUserScanQRCodeButton = function () {
    buttonStopScanQRCode.style.display = "none";
};
var showPageLoader = function () {
    loaderPage.style.display = "block";
};
var hidePageLoader = function () {
    loaderPage.style.display = "none";
};
var showModalLoader = function () {
    var searchContent = document.querySelector('.search-service-modal .modal-body-content');
    searchContent.innerHTML = '<div class="modal-loader" id="modal_first_loader">Loading...</div>';
    buttonCloseSearchService.disabled = true;
    checkboxFavailNo.disabled = true;
    checkboxFavailYes.disabled = true;
    checkboxFdaysMon.disabled = true;
    checkboxFdaysTues.disabled = true;
    checkboxFdaysWed.disabled = true;
    checkboxFdaysThurs.disabled = true;
    checkboxFdaysFri.disabled = true;
    inputSearchRideQuery.disabled = true;
};
var showViewModalLoader = function () {
    var viewContent = document.querySelector('.view-ride-logs-modal .modal-body-content');
    viewContent.innerHTML = '<div class="modal-loader" id="modal_first_loader">Loading...</div>';
    buttonCloseViewRideLogs.disabled = true;
};
var hideModalLoader = function () {
    var searchContent = document.querySelector('.search-service-modal .modal-body-content');
    searchContent.innerHTML = '';
    buttonCloseSearchService.disabled = false;
    checkboxFavailNo.disabled = false;
    checkboxFavailYes.disabled = false;
    checkboxFdaysMon.disabled = false;
    checkboxFdaysTues.disabled = false;
    checkboxFdaysWed.disabled = false;
    checkboxFdaysThurs.disabled = false;
    checkboxFdaysFri.disabled = false;
    inputSearchRideQuery.disabled = false;
};
var hideViewModalLoader = function () {
    var viewContent = document.querySelector('.view-ride-logs-modal .modal-body-content');
    viewContent.innerHTML = '';
    buttonCloseViewRideLogs.disabled = false;
};
var displayMapNavigation = function () {
    showMapNavigationContainer();
    hideUserProfileContainer();
};
var displayUserProfile = function () {
    showUserProfileContainer();
    hideMapNavigationContainer();
};
var displayLoginForm = function () {
    showLoginForm();
    hideRegisterForm();
};
var displayRegisterForm = function () {
    showRegisterForm();
    hideLoginForm();
};
var displayRideQRCodeContainer = function () {
    showRideQRCodeContainer();
    hideUserQRCodeContainer();
};
var displayUserQRCodeContainer = function () {
    showUserQRCodeContainer();
    hideRideQRCodeContainer();
};
var startUserQRCodeScan = function (shuttleServiceId) {
    var data = shuttleServiceId ? { "email": retrieveCurrentSession(), "shuttle_service_id": shuttleServiceId } : { "email": retrieveCurrentSession() };
    buttonScanQRCode.disabled = true;
    hideUserQRCodeContainer();
    showPageLoader();
    fetch(BASE_LOCAL_URL + "/user/scan", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringifyJSON(data)
    })
        .then(function (result) {
        return result.json();
    })
        .then(function (res) {
        if (res.status === 200) {
            delay(function () {
                hidePageLoader();
                buttonStopScanQRCode.disabled = false;
                hideUserScanQRCodeButton();
                showStopUserScanQRCodeButton();
                displayRideQRCodeContainer();
            }, 1500);
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
};
var stopUserQRCodeScan = function () {
    buttonStopScanQRCode.disabled = true;
    hideRideQRCodeContainer();
    showPageLoader();
    delay(function () {
        hidePageLoader();
        buttonScanQRCode.disabled = false;
        showUserScanQRCodeButton();
        hideStopUserScanQRCodeButton();
        displayUserQRCodeContainer();
    }, 1500);
};
var goToLoginPage = function () {
    clearUserQRCode();
    showLoginPage();
    hideHomepage();
};
var goToHomePage = function () {
    hideLoginPage();
    clearUserQRCode();
    showHomepage();
    displayMapNavigation();
    fetch(BASE_LOCAL_URL + "/user/view", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringifyJSON({ "email": retrieveCurrentSession() })
    })
        .then(function (result) {
        return result.json();
    })
        .then(function (res) {
        if (res.status === 200) {
            var data = res.data;
            displayUserName.innerHTML = '<img class=\"user-avatar\" src=\"./images/sample/' + data.avatar_image + '\" alt=\"' + data.name + '\"></img>' +
                '<span class=\"user-name\" title=\"' + data.email + '\">' + data.email + '</span>';
            userDisplayName.innerHTML = data.name;
            userDisplayDepartment.innerHTML = data.department;
            userDisplayJobRole.innerHTML = data.job_role;
            userDisplayPlateNumber.innerHTML = data.vehicle_plate_number ? data.vehicle_plate_number : '';
            generateUserQRCode(data);
            buttonSearchService.style.display = data.access_role === 'driver' ? 'none' : 'flex';
            buttonViewRideLogs.style.display = data.access_role === 'driver' ? 'none' : 'flex';
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
};
var goToUserProfile = function () {
    clearUserQRCode();
    displayUserProfile();
    fetch(BASE_LOCAL_URL + "/user/view?edit=true", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringifyJSON({ "email": retrieveCurrentSession() })
    })
        .then(function (result) {
        return result.json();
    })
        .then(function (res) {
        if (res.status === 200) {
            var data = res.data;
            var onsite_days_1 = data.profile.onsite_days.split(',');
            updateDisplayAvatarImage.src = "./images/sample/" + data.avatar_image;
            inputUpdateEmployeeID.value = data.employee_id;
            inputUpdateDisplayName.value = data.name;
            inputUpdateDepartment.value = data.department;
            inputUpdateJobRole.value = data.job_role;
            inputUpdatePointOfOrigin.value = data.profile.point_of_origin;
            inputUpdateEmail.value = data.email;
            inputUpdatePassword.value = data.password;
            selectorUpdateOnsiteSchedule.value = data.profile.onsite_schedule;
            selectorUpdateSpecificOnsiteDays.innerHTML = [{ short: 'mon', long: 'Monday' }, { short: 'tues', long: 'Tuesday' }, { short: 'wed', long: 'Wednesday' }, { short: 'thurs', long: 'Thursday' }, { short: 'fri', long: 'Friday' }].map(function (day) {
                var isSelected = onsite_days_1 && onsite_days_1.some(function (d) { return d === day.short; });
                return '<option value=\"' + day.short + '\" ' + (isSelected ? 'selected' : '') + '>' + day.long + '</option>';
            }).join('\n');
            generateUserQRCode(data);
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
};
var loginUser = function () {
    var input = {
        "email": inputLoginEmail.value,
        "password": inputLoginPassword.value
    };
    fetch(BASE_LOCAL_URL + "/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringifyJSON(input)
    })
        .then(function (result) {
        return result.json();
    })
        .then(function (data) {
        if (data.status === 200) {
            var user = data.data.email;
            storeCurrentSession(user);
            goToHomePage();
        }
        else {
            showAlertStatus(data.title, data.message, 'error');
            goToLoginPage();
        }
    })
        .catch(function (error) {
        showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
        console.error(error);
    });
};
var logoutUser = function () {
    fetch(BASE_LOCAL_URL + '/logout', {
        method: "DELETE"
    })
        .then(function () {
        destroyCurrentSession();
        hideNavSidebar();
        goToLoginPage();
        displayLoginForm();
    })
        .catch(function (error) {
        showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
        console.error(error);
    });
};
var loadRideSchedules = function () {
    var endpointURL = new URL(BASE_LOCAL_URL + '/user/ride');
    if (q) {
        endpointURL.searchParams.set('q', q);
    }
    if (favail) {
        endpointURL.searchParams.set('favail', favail);
    }
    if (fdays && fdays.length > 0) {
        endpointURL.searchParams.set('fdays', fdays.join(','));
    }
    fetch(endpointURL.toString())
        .then(function (result) { return result.json(); })
        .then(function (result) {
        var _a;
        var data = result.data;
        var searchContent = document.querySelector('.search-service-modal .modal-body-content');
        hideModalLoader();
        if (result.status === 200) {
            if (data && data.length > 0) {
                searchContent.innerHTML = data.map(function (value) {
                    return "\n<div class=\"content\">\n                                                    <div class=\"details\">\n                                                        <div class=\"col icon\">\n                                                            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\">\n                                                                <path d=\"M224 0C348.8 0 448 35.2 448 80V416C448 433.7 433.7 448 416 448V480C416 497.7 401.7 512 384 512H352C334.3 512 320 497.7 320 480V448H128V480C128 497.7 113.7 512 96 512H64C46.33 512 32 497.7 32 480V448C14.33 448 0 433.7 0 416V80C0 35.2 99.19 0 224 0zM64 256C64 273.7 78.33 288 96 288H352C369.7 288 384 273.7 384 256V128C384 110.3 369.7 96 352 96H96C78.33 96 64 110.3 64 128V256zM80 400C97.67 400 112 385.7 112 368C112 350.3 97.67 336 80 336C62.33 336 48 350.3 48 368C48 385.7 62.33 400 80 400zM368 400C385.7 400 400 385.7 400 368C400 350.3 385.7 336 368 336C350.3 336 336 350.3 336 368C336 385.7 350.3 400 368 400z\"/>\n                                                            </svg>\n                                                            <span id=\"vehicle_availability\" class=\"".concat(value.availability === "AVAILABLE" ? 'color-text-green' : 'color-text-red', "\">").concat(value.availability, "</span>\n                                                        </div>\n                                                        <div class=\"col\">\n                                                            <div class=\"row\">\n                                                                <span class=\"label\">Plate No.</span>\n                                                                <span id=\"vehicle_plate_number\">").concat(value.vehicle_plate_number, "</span>\n                                                            </div>\n                                                            <div class=\"row\">\n                                                                <span class=\"label\">Vehicle ID</span>\n                                                                <span id=\"vehicle_id\">").concat(value.vehicle_id, "</span>\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"col\">\n                                                            <div class=\"row\">\n                                                                <span class=\"label\">Driver</span>\n                                                                <span id=\"vehicle_driver_name\">").concat(capitalizeMultipleStrings(value.driver_name, " ", " "), "</span>\n                                                            </div>\n                                                            <div class=\"row\">\n                                                                <span class=\"label\">Type</span>\n                                                                <span id=\"vehicle_type\">").concat(capitalizeString(value.vehicle_type), "</span>\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"col\">\n                                                            <div class=\"row\">\n                                                                <span class=\"label\">Color</span>\n                                                                <span id=\"vehicle_color\">").concat(capitalizeString(value.vehicle_color), "</span>\n                                                            </div>\n                                                            <div class=\"row\">\n                                                                <span class=\"label\">Schedule</span>\n                                                                <span class=\"vehicle-schedule-type\">\n                                                                    ").concat(capitalizeString(value.schedule), " \n                                                                    <span class=\"show-schedule\">\n                                                                        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\n                                                                            <path d=\"M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z\"/>\n                                                                        </svg>\n                                                                        <span style=\"display: none;\">").concat(capitalizeMultipleStrings(value.schedule_days, ",", ","), "</span>\n                                                                    </span>\n                                                                </span>\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                </div>");
                }).join('\n');
                (_a = document.querySelectorAll('.show-schedule')) === null || _a === void 0 ? void 0 : _a.forEach(function (element) {
                    element.addEventListener('click', function (e) {
                        if (e.currentTarget instanceof Element) {
                            var span = e.currentTarget.querySelector('span');
                            span.style.display = span.style.display === "none" ? "block" : "none";
                        }
                    });
                });
            }
            else {
                searchContent.innerHTML = '<div class="modal-no-results-found-container" id="modal_no_results_found">No results found.</div>';
            }
        }
        else {
            searchContent.innerHTML = '<div class="modal-no-results-found-container" id="modal_no_results_found">No results found.</div>';
        }
    })
        .catch(function (error) {
        showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
        console.error(error);
    });
};
var loadRideLogs = function () {
    var endpointURL = new URL(BASE_LOCAL_URL + '/user/rides');
    fetch(endpointURL.toString(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringifyJSON({ "email": retrieveCurrentSession() })
    })
        .then(function (result) { return result.json(); })
        .then(function (result) {
        var _a;
        var data = result.data;
        var viewContent = document.querySelector('.view-ride-logs-modal .modal-body-content');
        hideViewModalLoader();
        if (result.status === 200) {
            if (data && data.length > 0) {
                viewContent.innerHTML = data.map(function (value) {
                    return "\n<div class=\"content\">\n                            <div class=\"details\">\n                                <div class=\"col icon\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\">\n                                        <path d=\"M256 96C256 113.7 270.3 128 288 128C305.7 128 320 113.7 320 96V32H394.8C421.9 32 446 49.08 455.1 74.63L572.9 407.2C574.9 413 576 419.2 576 425.4C576 455.5 551.5 480 521.4 480H320V416C320 398.3 305.7 384 288 384C270.3 384 256 398.3 256 416V480H54.61C24.45 480 0 455.5 0 425.4C0 419.2 1.06 413 3.133 407.2L120.9 74.63C129.1 49.08 154.1 32 181.2 32H255.1L256 96zM320 224C320 206.3 305.7 192 288 192C270.3 192 256 206.3 256 224V288C256 305.7 270.3 320 288 320C305.7 320 320 305.7 320 288V224z\" />\n                                    </svg>\n                                </div>\n                                <div class=\"col\">\n                                    <div class=\"row\">\n                                        <span class=\"label\">Plate No.</span>\n                                        <span id=\"vehicle_plate_number\">".concat(value.vehicle_plate_number, "</span>\n                                    </div>\n                                    <div class=\"row\">\n                                        <span class=\"label\">Vehicle ID</span>\n                                        <span id=\"vehicle_id\">").concat(value.vehicle_id, "</span>\n                                    </div>\n                                </div>\n                                <div class=\"col\">\n                                    <div class=\"row\">\n                                        <span class=\"label\">Driver</span>\n                                        <span id=\"vehicle_driver_name\">").concat(value.driver_name, "</span>\n                                    </div>\n                                    <div class=\"row\">\n                                        <span class=\"label\">Color</span>\n                                        <span id=\"vehicle_color\">").concat(value.vehicle_color, "</span>\n                                    </div>\n                                </div>\n                                <div class=\"col\">\n                                    <div class=\"row\">\n                                        <span class=\"label\">Type</span>\n                                        <span id=\"vehicle_type\">").concat(value.vehicle_type, "</span>\n                                    </div>\n                                    <div class=\"row\">\n                                        <span class=\"label\">Date & Time</span>\n                                        <span id=\"log-datetime\">").concat(value.log_datetime, "</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>");
                }).join('\n');
                (_a = document.querySelectorAll('.show-schedule')) === null || _a === void 0 ? void 0 : _a.forEach(function (element) {
                    element.addEventListener('click', function (e) {
                        if (e.currentTarget instanceof Element) {
                            var span = e.currentTarget.querySelector('span');
                            span.style.display = span.style.display === "none" ? "block" : "none";
                        }
                    });
                });
            }
            else {
                viewContent.innerHTML = '<div class="modal-no-results-found-container" id="modal_no_results_found">No results found.</div>';
            }
        }
        else {
            viewContent.innerHTML = '<div class="modal-no-results-found-container" id="modal_no_results_found">No results found.</div>';
        }
    })
        .catch(function (error) {
        showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
        console.error(error);
    });
};
var displayRideSchedules = function () {
    showModalLoader();
    delay(function () {
        loadRideSchedules();
    }, 1500);
};
var displayRideLogs = function () {
    showViewModalLoader();
    delay(function () {
        loadRideLogs();
    }, 1500);
};
buttonUserLogin.addEventListener('click', function () {
    loginUser();
});
buttonUserRegister.addEventListener('click', function () {
    loginUser();
});
buttonGoToLoginForm.addEventListener('click', function (e) {
    e.preventDefault();
    displayLoginForm();
});
buttonGoToRegiterForm.addEventListener('click', function (e) {
    e.preventDefault();
    displayRegisterForm();
});
buttonNavigationMenu.addEventListener('click', function (e) {
    e.preventDefault();
    showNavSidebar();
});
buttonCloseNavSidebar.addEventListener('click', function (e) {
    e.preventDefault();
    hideNavSidebar();
});
buttonSearchService.addEventListener('click', function (e) {
    e.preventDefault();
    showSearchServiceContainer();
    displayRideSchedules();
});
buttonCloseSearchService.addEventListener('click', function (e) {
    e.preventDefault();
    hideSearchServiceContainer();
    favail = '';
    fdays = [];
    q = '';
    checkboxFavailNo.checked = false;
    checkboxFavailYes.checked = false;
    checkboxFdaysMon.checked = false;
    checkboxFdaysTues.checked = false;
    checkboxFdaysWed.checked = false;
    checkboxFdaysThurs.checked = false;
    checkboxFdaysFri.checked = false;
    inputSearchRideQuery.value = '';
});
buttonCloseViewRideLogs.addEventListener('click', function (e) {
    e.preventDefault();
    hideViewRideLogsContainer();
});
buttonUserHome.addEventListener('click', function (e) {
    e.preventDefault();
    displayMapNavigation();
    hideNavSidebar();
});
buttonUserProfile.addEventListener('click', function (e) {
    e.preventDefault();
    goToUserProfile();
    hideNavSidebar();
});
buttonUserLogout.addEventListener('click', function (e) {
    e.preventDefault();
    logoutUser();
});
buttonStartScanQRCode.addEventListener('click', function () {
    scanUserQRcode();
});
buttonStopScanQRCode.addEventListener('click', function () {
    stopScanUserQRCodeScan();
});
buttonViewRideLogs.addEventListener('click', function () {
    showViewRideLogsContainer();
    displayRideLogs();
});
buttonUpdateProfile.addEventListener('click', function () {
    var employee_id = document.getElementsByName('employee_id')[0].value;
    var display_name = document.getElementsByName('display_name')[0].value;
    var department = document.getElementsByName('department')[0].value;
    var job_role = document.getElementsByName('job_role')[0].value;
    var point_of_origin = document.getElementsByName('point_of_origin')[0].value;
    var onsite_schedule = document.getElementsByName('onsite_schedule')[0].value;
    var specific_onsite_days = Array.from(document.querySelectorAll('#update_specific_onsite_days option:checked')).map(function (el) { return el.value; }).join(',');
    var email = document.getElementsByName('user_email')[0].value;
    var password = document.getElementsByName('user_password')[0].value;
    var payload = {
        "employee_id": employee_id,
        "name": display_name,
        "department": department,
        "job_role": job_role,
        "point_of_origin": point_of_origin,
        "onsite_schedule": onsite_schedule,
        "onsite_days": specific_onsite_days,
        "email": email,
        "password": password
    };
    fetch(BASE_LOCAL_URL + "/user/update?_method=PATCH", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringifyJSON(payload)
    })
        .then(function (result) {
        return result.json();
    })
        .then(function (res) {
        if (res.status === 200) {
            showAlertStatus(res.title, res.message, 'success');
        }
        else {
            showAlertStatus(res.title, res.message, 'error');
        }
    })
        .catch(function (error) {
        showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
        console.error(error);
    });
});
inputSearchRideQuery.addEventListener('keyup', function (e) {
    q = e.currentTarget.value;
    loadRideSchedules();
});
checkboxFavailYes.addEventListener('click', function () {
    if ((checkboxFavailYes.checked === true && checkboxFavailNo.checked === true) || (checkboxFavailYes.checked === false && checkboxFavailNo.checked === false)) {
        favail = '';
    }
    else if (checkboxFavailYes.checked === false) {
        favail = "false";
    }
    else {
        favail = "true";
    }
    loadRideSchedules();
});
checkboxFavailNo.addEventListener('click', function () {
    if ((checkboxFavailYes.checked === true && checkboxFavailNo.checked === true) || (checkboxFavailYes.checked === false && checkboxFavailNo.checked === false)) {
        favail = '';
    }
    else if (checkboxFavailNo.checked === false) {
        favail = "true";
    }
    else {
        favail = "false";
    }
    loadRideSchedules();
});
checkboxFdaysMon.addEventListener('click', function () {
    if (checkboxFdaysMon.checked === true) {
        fdays.push(checkboxFdaysMon.value);
    }
    else {
        fdays = fdays.filter(function (day) { return day !== checkboxFdaysMon.value; });
    }
    loadRideSchedules();
});
checkboxFdaysTues.addEventListener('click', function () {
    if (checkboxFdaysTues.checked === true) {
        fdays.push(checkboxFdaysTues.value);
    }
    else {
        fdays = fdays.filter(function (day) { return day !== checkboxFdaysTues.value; });
    }
    loadRideSchedules();
});
checkboxFdaysWed.addEventListener('click', function () {
    if (checkboxFdaysWed.checked === true) {
        fdays.push(checkboxFdaysWed.value);
    }
    else {
        fdays = fdays.filter(function (day) { return day !== checkboxFdaysWed.value; });
    }
    loadRideSchedules();
});
checkboxFdaysThurs.addEventListener('click', function () {
    if (checkboxFdaysThurs.checked === true) {
        fdays.push(checkboxFdaysThurs.value);
    }
    else {
        fdays = fdays.filter(function (day) { return day !== checkboxFdaysThurs.value; });
    }
    loadRideSchedules();
});
checkboxFdaysFri.addEventListener('click', function () {
    if (checkboxFdaysFri.checked === true) {
        fdays.push(checkboxFdaysFri.value);
    }
    else {
        fdays = fdays.filter(function (day) { return day !== checkboxFdaysFri.value; });
    }
    loadRideSchedules();
});
document.addEventListener('DOMContentLoaded', function () {
    var currentSession = retrieveCurrentSession();
    if (currentSession) {
        goToHomePage();
    }
    else {
        goToLoginPage();
    }
});
