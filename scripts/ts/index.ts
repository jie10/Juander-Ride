/** DOM Elements */
const pageLogin = document.querySelector('.login-page') as HTMLDivElement;
const pageHome = document.querySelector('.home-page') as HTMLDivElement;
const navigationSidebarContainer = document.querySelector('.navigation-side-bar-container') as HTMLDivElement;
const mapNavigationContainer = document.querySelector('.map-navigation-container') as HTMLDivElement;
const userProfileContainer = document.querySelector('.user-profile-container') as HTMLDivElement;
const userQRCodeContainer = document.querySelector('.user-qr-code-container') as HTMLDivElement;
const rideQRCodeContainer = document.querySelector('.ride-qr-code-container') as HTMLDivElement;
const loaderPage = document.getElementById('page_loader') as HTMLDivElement;
const displayUserName = document.getElementById('display_user_name') as HTMLDivElement;
const userQRCode = document.getElementById('user_qr_code') as HTMLDivElement;

const userDisplayName = document.getElementById('user_display_name') as HTMLHeadingElement;

const updateDisplayAvatarImage = document.getElementById('update_display_avatar_image') as HTMLImageElement;

const inputLoginEmail = document.getElementById('login_email') as HTMLInputElement;
const inputLoginPassword = document.getElementById('login_password') as HTMLInputElement;
const inputUpdateEmployeeID = document.getElementById('update_employee_id') as HTMLInputElement;
const inputUpdateDisplayName = document.getElementById('update_display_name') as HTMLInputElement;
const inputUpdateDepartment = document.getElementById('update_department') as HTMLInputElement;
const inputUpdateJobRole = document.getElementById('update_job_role') as HTMLInputElement;
const inputUpdatePointOfOrigin = document.getElementById('update_point_of_origin') as HTMLInputElement;
const inputUpdateEmail = document.getElementById('update_email') as HTMLInputElement;
const inputUpdatePassword = document.getElementById('update_password') as HTMLInputElement;

const selectorUpdateOnsiteSchedule = document.getElementById('update_onsite_schedule') as HTMLSelectElement;
const selectorUpdateSpecificOnsiteDays = document.getElementById('update_specific_onsite_days') as HTMLSelectElement;

const buttonGoToLoginForm = document.getElementById('go_to_login_form') as HTMLButtonElement;
const buttonGoToRegiterForm = document.getElementById('go_to_register_form') as HTMLButtonElement;
const buttonUserLogin = document.getElementById('login_button') as HTMLButtonElement;
const buttonUserRegister = document.getElementById('register_button') as HTMLButtonElement;
const buttonNavigationMenu = document.getElementById('navigation_menu_button') as HTMLButtonElement;
const buttonCloseNavSidebar = document.getElementById('close_nav_side_bar_button') as HTMLButtonElement;
const buttonUserLogout = document.getElementById('logout_button') as HTMLButtonElement;
const buttonUserHome = document.getElementById('home_button') as HTMLButtonElement;
const buttonUserProfile = document.getElementById('profile_button') as HTMLButtonElement;
const buttonScanQRCode = document.getElementById('scan_qr_code_button') as HTMLButtonElement;
const buttonStopScanQRCode = document.getElementById('stop_scan_qr_code_button') as HTMLButtonElement;

const formLogin = document.querySelector('.login-form') as HTMLDivElement;
const formRegister = document.querySelector('.register-form') as HTMLDivElement;


/** Variables */
const BASE_LOCAL_URL = 'http://localhost:8000';


/** Functions */
const delay = (callback: any, DELAY_TIMEOUT_IN_MILLISECONDS: number) => {
    setTimeout(callback, DELAY_TIMEOUT_IN_MILLISECONDS);
}

const stringifyJSON = (obj: Object) => JSON.stringify(obj);

const parseJSON = (str: string) => JSON.parse(str);

const retrieveCurrentSession = () => localStorage.getItem('user');

const storeCurrentSession = (user: string) => localStorage.setItem('user', user);

const destroyCurrentSession = () => localStorage.removeItem('user');

const showLoginForm = () => {
    formLogin.style.display = "block";
}

const hideLoginForm = () => {
    formLogin.style.display = "none";
}

const showRegisterForm = () => {
    formRegister.style.display = "block";
}

const hideRegisterForm = () => {
    formRegister.style.display = "none";
}

const showNavSidebar = () => {
    navigationSidebarContainer.style.display = "block";
}

const hideNavSidebar = () => {
    navigationSidebarContainer.style.display = "none";
}

const showLoginPage = () => {
    pageLogin.style.display = "block";
}

const hideLoginPage = () => {
    pageLogin.style.display = "none";
}

const showHomepage = () => {
    pageHome.style.display = "block";
}

const hideHomepage = () => {
    pageHome.style.display = "none";
}

const showMapNavigationContainer = () => {
    mapNavigationContainer.style.display = "block";
}

const hideMapNavigationContainer = () => {
    mapNavigationContainer.style.display = "none";
}

const showUserProfileContainer = () => {
    userProfileContainer.style.display = "block";
}

const hideUserProfileContainer = () => {
    userProfileContainer.style.display = "none";
}

const showRideQRCodeContainer = () => {
    rideQRCodeContainer.style.display = "block";
}

const hideRideQRCodeContainer = () => {
    rideQRCodeContainer.style.display = "none";
}

const showUserQRCodeContainer = () => {
    userQRCodeContainer.style.display = "block";
}

const hideUserQRCodeContainer = () => {
    userQRCodeContainer.style.display = "none";
}

const showUserScanQRCodeButton = () => {
    buttonScanQRCode.style.display = "flex";
}

const hideUserScanQRCodeButton = () => {
    buttonScanQRCode.style.display = "none";
}

const showStopUserScanQRCodeButton = () => {
    buttonStopScanQRCode.style.display = "flex";
}

const hideStopUserScanQRCodeButton = () => {
    buttonStopScanQRCode.style.display = "none";
}

const showPageLoader = () => {
    loaderPage.style.display = "block";
}

const hidePageLoader = () => {
    loaderPage.style.display = "none";
}

const displayMapNavigation = () => {
    showMapNavigationContainer();
    hideUserProfileContainer();
}

const displayUserProfile = () => {
    showUserProfileContainer();
    hideMapNavigationContainer();
}

const displayLoginForm = () => {
    showLoginForm();
    hideRegisterForm();
}

const displayRegisterForm = () => {
    showRegisterForm();
    hideLoginForm();
}

const displayRideQRCodeContainer = () => {
    showRideQRCodeContainer();
    hideUserQRCodeContainer();
}

const displayUserQRCodeContainer = () => {
    showUserQRCodeContainer();
    hideRideQRCodeContainer();
}

const startUserQRCodeScan = () => {
    buttonScanQRCode.disabled = true;
    hideUserQRCodeContainer();
    showPageLoader();

    delay(() => {
        hidePageLoader();
        buttonStopScanQRCode.disabled = false;
        hideUserScanQRCodeButton();
        showStopUserScanQRCodeButton();
        displayRideQRCodeContainer();
    }, 1500);
}

const stopUserQRCodeScan = () => {
    buttonStopScanQRCode.disabled = true;
    hideRideQRCodeContainer();
    showPageLoader();

    delay(() => {
        hidePageLoader();
        buttonScanQRCode.disabled = false;
        showUserScanQRCodeButton();
        hideStopUserScanQRCodeButton();
        displayUserQRCodeContainer();
    }, 1500);
}

const goToLoginPage = () => {
    showLoginPage();
    hideHomepage();
    userQRCode.innerHTML = "";
}

const goToHomePage = () => {
    hideLoginPage();
    showHomepage();
    displayMapNavigation();

    fetch(BASE_LOCAL_URL + "/user/view", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringifyJSON({"email": retrieveCurrentSession() })
    })
        .then(function (result) {
            return result.json();
        })
        .then(function (res) {
            if (res.status === 200) {
                let data = res.data;
                displayUserName.innerHTML = '<img class=\"user-avatar\" src=\"./images/sample/' + data.avatar_image + '\" alt=\"' + data.name + '\"></img>' +
                                            '<span class=\"user-name\" title=\"' + data.email + '\">' + data.email + '</span>';
                userDisplayName.innerHTML = data.name;
                generateUserQRCode(data);
            } else {
                destroyCurrentSession();
                goToLoginPage();
            }
        })
        .catch(function (error) {
            showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
            console.error(error);
        });
}

const goToUserProfile = () => {
    displayUserProfile();

    fetch(BASE_LOCAL_URL + "/user/view?edit=true", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringifyJSON({"email": retrieveCurrentSession() })
    })
        .then(function (result) {
            return result.json();
        })
        .then(function (res) {
            if (res.status === 200) {
                let data = res.data;
                let onsite_days = data.profile.onsite_days.split(',');

                updateDisplayAvatarImage.src = "./images/sample/" + data.avatar_image;
                inputUpdateEmployeeID.value = data.employee_id;
                inputUpdateDisplayName.value = data.name;
                inputUpdateDepartment.value = data.department;
                inputUpdateJobRole.value = data.job_role;
                inputUpdatePointOfOrigin.value = data.profile.point_of_origin;
                inputUpdateEmail.value = data.email;
                inputUpdatePassword.value = data.password;
                selectorUpdateOnsiteSchedule.value = data.profile.onsite_schedule;
                selectorUpdateSpecificOnsiteDays.innerHTML = [{short: 'mon', long: 'Monday'}, {short: 'tues', long: 'Tuesday'}, {short: 'wed', long: 'Wednesday'}, {short: 'thurs', long: 'Thursday'}, {short: 'fri', long: 'Friday'}].map(day => {
                    let isSelected = onsite_days && onsite_days.some((d: string) => d === day.short);
                    return '<option value=\"' + day.short + '\" ' + (isSelected ? 'selected' : '') + '>' + day.long + '</option>';
                }).join('\n');

                generateUserQRCode(data);
            } else {
                destroyCurrentSession();
                goToLoginPage();
            }
        })
        .catch(function (error) {
            showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
            console.error(error);
        });

}

const loginUser = () => {
    let input = {
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
                let user = data.data.email;
                storeCurrentSession(user);
                goToHomePage();
            } else {
                showAlertStatus(data.title, data.message, 'error');
                goToLoginPage();
            }
        })
        .catch(function (error) {
            showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
            console.error(error);
        });
    
}

const logoutUser = () => {
    fetch(BASE_LOCAL_URL + '/logout?_method=DELETE')
        .then(() => {
            destroyCurrentSession();
            hideNavSidebar();
            goToLoginPage();
            displayLoginForm();
        })
        .catch(function (error) {
            showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
            console.error(error);
        });
}


/** DOM Events */
buttonUserLogin.addEventListener('click', () => {
    loginUser();
});

buttonUserRegister.addEventListener('click', () => {
    loginUser();
});

buttonGoToLoginForm.addEventListener('click', (e) => {
    e.preventDefault();
    displayLoginForm();
});

buttonGoToRegiterForm.addEventListener('click', (e) => {
    e.preventDefault();
    displayRegisterForm();
});

buttonNavigationMenu.addEventListener('click', (e) => {
    e.preventDefault();
    showNavSidebar();
});

buttonCloseNavSidebar.addEventListener('click', (e) => {
    e.preventDefault();
    hideNavSidebar();
});

buttonUserHome.addEventListener('click', (e) => {
    e.preventDefault();
    displayMapNavigation();
});

buttonUserProfile.addEventListener('click', (e) => {
    e.preventDefault();
    goToUserProfile();
});

buttonUserLogout.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});

/** PAGE LOAD INITIALIZATION */
document.addEventListener('DOMContentLoaded', function() {
    let currentSession = retrieveCurrentSession();

    if (currentSession) {
        goToHomePage();
    } else {
        goToLoginPage();
    }
});