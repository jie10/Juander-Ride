"use strict";
var pageLogin = document.querySelector('.login-page');
var pageHome = document.querySelector('.home-page');
var navigationSidebarContainer = document.querySelector('.navigation-side-bar-container');
var mapNavigationContainer = document.querySelector('.map-navigation-container');
var userProfileContainer = document.querySelector('.user-profile-container');
var userQRCodeContainer = document.querySelector('.user-qr-code-container');
var rideQRCodeContainer = document.querySelector('.ride-qr-code-container');
var loaderPage = document.getElementById('page_loader');
var displayUserName = document.getElementById('display_user_name');
var userQRCode = document.getElementById('user_qr_code');
var userDisplayName = document.getElementById('user_display_name');
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
var formLogin = document.querySelector('.login-form');
var formRegister = document.querySelector('.register-form');
var BASE_LOCAL_URL = 'http://localhost:8000';
var delay = function (callback, DELAY_TIMEOUT_IN_MILLISECONDS) {
    setTimeout(callback, DELAY_TIMEOUT_IN_MILLISECONDS);
};
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
var startUserQRCodeScan = function () {
    buttonScanQRCode.disabled = true;
    hideUserQRCodeContainer();
    showPageLoader();
    delay(function () {
        hidePageLoader();
        buttonStopScanQRCode.disabled = false;
        hideUserScanQRCodeButton();
        showStopUserScanQRCodeButton();
        displayRideQRCodeContainer();
    }, 1500);
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
    showLoginPage();
    hideHomepage();
    userQRCode.innerHTML = "";
};
var goToHomePage = function () {
    hideLoginPage();
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
var goToUserProfile = function () {
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
    fetch(BASE_LOCAL_URL + '/logout?_method=DELETE')
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
buttonUserHome.addEventListener('click', function (e) {
    e.preventDefault();
    displayMapNavigation();
});
buttonUserProfile.addEventListener('click', function (e) {
    e.preventDefault();
    goToUserProfile();
});
buttonUserLogout.addEventListener('click', function (e) {
    e.preventDefault();
    logoutUser();
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
