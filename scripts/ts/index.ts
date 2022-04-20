/** DOM Elements */
const pageLogin = document.querySelector('.login-page') as HTMLDivElement;
const pageHome = document.querySelector('.home-page') as HTMLDivElement;
const navigationSidebarContainer = document.querySelector('.navigation-side-bar-container') as HTMLDivElement;
const mapNavigationContainer = document.querySelector('.map-navigation-container') as HTMLDivElement;
const searchServiceContainer = document.querySelector('.search-service-container') as HTMLDivElement;
const userProfileContainer = document.querySelector('.user-profile-container') as HTMLDivElement;
const userQRCodeContainer = document.querySelector('.user-qr-code-container') as HTMLDivElement;
const rideQRCodeContainer = document.querySelector('.ride-qr-code-container') as HTMLDivElement;
const loaderPage = document.getElementById('page_loader') as HTMLDivElement;
const displayUserName = document.getElementById('display_user_name') as HTMLDivElement;
const userQRCode = document.getElementById('user_qr_code') as HTMLDivElement;

const userDisplayName = document.getElementById('user_display_name') as HTMLHeadingElement;
const userDisplayDepartment = document.getElementById('user_display_department') as HTMLHeadingElement;
const userDisplayJobRole = document.getElementById('user_display_jobe_role') as HTMLHeadingElement;
const userDisplayPlateNumber = document.getElementById('user_display_plate_number') as HTMLHeadingElement;

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
const buttonStartScanQRCode = document.getElementById('scan_qr_code_button') as HTMLButtonElement;
const buttonSearchService = document.getElementById('search_service_button') as HTMLButtonElement;
const buttonCloseSearchService = document.getElementById('close_search_service_modal_button') as HTMLButtonElement;

const formLogin = document.querySelector('.login-form') as HTMLDivElement;
const formRegister = document.querySelector('.register-form') as HTMLDivElement;


/** Variables */
const BASE_LOCAL_URL = 'http://localhost:8000';


/** Functions */
const delay = (callback: any, DELAY_TIMEOUT_IN_MILLISECONDS: number) => {
    setTimeout(callback, DELAY_TIMEOUT_IN_MILLISECONDS);
}

const capitalizeString = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

const capitalizeMultipleStrings = (str: string, separator: string, joiner: string) => str.split(separator).map(s => capitalizeString(s)).join(joiner);

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

const showSearchServiceContainer = () => {
    searchServiceContainer.style.display = "block";
}

const hideSearchServiceContainer = () => {
    searchServiceContainer.style.display = "none";
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
    clearUserQRCode();
    showLoginPage();
    hideHomepage();
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
                userDisplayDepartment.innerHTML = data.department;
                userDisplayJobRole.innerHTML = data.job_role;
                userDisplayPlateNumber.innerHTML = data.vehicle_plate_number ? data.vehicle_plate_number  : '';

                generateUserQRCode(data);

                buttonSearchService.style.display = data.access_role === 'driver' ? 'none' : 'flex';
                buttonScanQRCode.style.display = data.access_role === 'driver' ? 'none' : 'flex';
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
    clearUserQRCode();
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

const loadRideSchedules = () => {
    fetch(BASE_LOCAL_URL + '/user/ride')
        .then(result => result.json())
        .then(result => {
            let data = result.data;

            if (result.status === 200) {
                console.log(data.length)
                let searchContent = document.querySelector('.search-service-modal .modal-body-content') as HTMLDivElement;
                searchContent.innerHTML = '';

                searchContent.innerHTML = data.map((value: { availability: string, vehicle_id: string, vehicle_plate_number: string, driver_name: string, vehicle_type: string, vehicle_color: string, schedule: string, schedule_days: string }) => {
                    console.log(value.availability)
                    return `\n<div class="content">
                                                <div class="details">
                                                    <div class="col icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                            <path d="M224 0C348.8 0 448 35.2 448 80V416C448 433.7 433.7 448 416 448V480C416 497.7 401.7 512 384 512H352C334.3 512 320 497.7 320 480V448H128V480C128 497.7 113.7 512 96 512H64C46.33 512 32 497.7 32 480V448C14.33 448 0 433.7 0 416V80C0 35.2 99.19 0 224 0zM64 256C64 273.7 78.33 288 96 288H352C369.7 288 384 273.7 384 256V128C384 110.3 369.7 96 352 96H96C78.33 96 64 110.3 64 128V256zM80 400C97.67 400 112 385.7 112 368C112 350.3 97.67 336 80 336C62.33 336 48 350.3 48 368C48 385.7 62.33 400 80 400zM368 400C385.7 400 400 385.7 400 368C400 350.3 385.7 336 368 336C350.3 336 336 350.3 336 368C336 385.7 350.3 400 368 400z"/>
                                                        </svg>
                                                        <span id="vehicle_availability" class="${value.availability === "AVAILABLE" ? 'color-text-green' : 'color-text-red'}">${value.availability}</span>
                                                    </div>
                                                    <div class="col">
                                                        <div class="row">
                                                            <span class="label">Plate No.</span>
                                                            <span id="vehicle_plate_number">${value.vehicle_plate_number}</span>
                                                        </div>
                                                        <div class="row">
                                                            <span class="label">Vehicle ID</span>
                                                            <span id="vehicle_id">${value.vehicle_id}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="row">
                                                            <span class="label">Driver</span>
                                                            <span id="vehicle_driver_name">${capitalizeMultipleStrings(value.driver_name, " ", " ")}</span>
                                                        </div>
                                                        <div class="row">
                                                            <span class="label">Type</span>
                                                            <span id="vehicle_type">${capitalizeString(value.vehicle_type)}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="row">
                                                            <span class="label">Color</span>
                                                            <span id="vehicle_color">${capitalizeString(value.vehicle_color)}</span>
                                                        </div>
                                                        <div class="row">
                                                            <span class="label">Schedule</span>
                                                            <span class="vehicle-schedule-type">
                                                                ${capitalizeString(value.schedule)} 
                                                                <span class="show-schedule">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                                        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"/>
                                                                    </svg>
                                                                    <span style="display: none;">${capitalizeMultipleStrings(value.schedule_days, ",", ",")}</span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                }).join('\n');

                document.querySelectorAll('.show-schedule')?.forEach(element => {
                    element.addEventListener('click', (e) => {
                        if (e.currentTarget instanceof Element) {
                            let span = e.currentTarget.querySelector('span') as HTMLSpanElement;
                            span.style.display = span.style.display === "none" ? "block" : "none";
                        }
                    });
                });
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

buttonSearchService.addEventListener('click', (e) => {
    e.preventDefault();
    showSearchServiceContainer();
    loadRideSchedules();
});

buttonCloseSearchService.addEventListener('click', (e) => {
    e.preventDefault();
    hideSearchServiceContainer();
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

buttonStartScanQRCode.addEventListener('click', () => {
    scanUserQRcode();
});

buttonStopScanQRCode.addEventListener('click', () => {
    stopScanUserQRCodeScan();
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