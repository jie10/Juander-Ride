/** DOM Elements */
const pageLogin = document.querySelector('.login-page') as HTMLDivElement;
const pageHome = document.querySelector('.home-page') as HTMLDivElement;
const navigationSidebarContainer = document.querySelector('.navigation-side-bar-container') as HTMLDivElement;
const mapNavigationContainer = document.querySelector('.map-navigation-container') as HTMLDivElement;
const searchServiceContainer = document.querySelector('.search-service-container') as HTMLDivElement;
const viewRideLogsContainer = document.querySelector('.view-ride-logs-container') as HTMLDivElement;
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
const inputSearchRideQuery = document.getElementById('search_ride_query') as HTMLInputElement;
const checkboxFavailYes = document.getElementById('favail_yes_checkbox') as HTMLInputElement;
const checkboxFavailNo = document.getElementById('favail_no_checkbox') as HTMLInputElement;
const checkboxFdaysMon = document.getElementById('fdays_mon_checkbox') as HTMLInputElement;
const checkboxFdaysTues = document.getElementById('fdays_tues_checkbox') as HTMLInputElement;
const checkboxFdaysWed = document.getElementById('fdays_wed_checkbox') as HTMLInputElement;
const checkboxFdaysThurs = document.getElementById('fdays_thurs_checkbox') as HTMLInputElement;
const checkboxFdaysFri = document.getElementById('fdays_fri_checkbox') as HTMLInputElement;

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
const buttonViewRideLogs = document.getElementById('view_ride_logs_button') as HTMLButtonElement;
const buttonCloseSearchService = document.getElementById('close_search_service_modal_button') as HTMLButtonElement;
const buttonCloseViewRideLogs = document.getElementById('close_view_ride_logs_modal_button') as HTMLButtonElement;
const buttonUpdateProfile = document.getElementById('update_profile_button') as HTMLButtonElement;

const formLogin = document.querySelector('.login-form') as HTMLDivElement;
const formRegister = document.querySelector('.register-form') as HTMLDivElement;


/** Variables */
const BASE_LOCAL_URL = 'http://localhost:8000';
let q: string = '';
let favail: string = '';
let fdays: string[] = [];


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

const showViewRideLogsContainer = () => {
    viewRideLogsContainer.style.display = "block";
}

const hideViewRideLogsContainer = () => {
    viewRideLogsContainer.style.display = "none";
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

const showModalLoader = () => {
    let searchContent = document.querySelector('.search-service-modal .modal-body-content') as HTMLDivElement;

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
}

const showViewModalLoader = () => {
    let viewContent = document.querySelector('.view-ride-logs-modal .modal-body-content') as HTMLDivElement;

    viewContent.innerHTML = '<div class="modal-loader" id="modal_first_loader">Loading...</div>';
    buttonCloseViewRideLogs.disabled = true;
}

const hideModalLoader = () => {
    let searchContent = document.querySelector('.search-service-modal .modal-body-content') as HTMLDivElement;

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
}

const hideViewModalLoader = () => {
    let viewContent = document.querySelector('.view-ride-logs-modal .modal-body-content') as HTMLDivElement;

    viewContent.innerHTML = '';
    buttonCloseViewRideLogs.disabled = false;
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
                buttonViewRideLogs.style.display = data.access_role === 'driver' ? 'none' : 'flex';
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
    fetch(BASE_LOCAL_URL + '/logout', {
        method: "DELETE"    
    })
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
    let endpointURL = new URL(BASE_LOCAL_URL + '/user/ride');

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
        .then(result => result.json())
        .then(result => {
            let data = result.data;
            let searchContent = document.querySelector('.search-service-modal .modal-body-content') as HTMLDivElement;

            hideModalLoader();

            if (result.status === 200) {
                if (data && data.length > 0) {
                    searchContent.innerHTML = data.map((value: { availability: string, vehicle_id: string, vehicle_plate_number: string, driver_name: string, vehicle_type: string, vehicle_color: string, schedule: string, schedule_days: string }) => {
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
                    searchContent.innerHTML = '<div class="modal-no-results-found-container" id="modal_no_results_found">No results found.</div>';
                }
            } else {
                searchContent.innerHTML = '<div class="modal-no-results-found-container" id="modal_no_results_found">No results found.</div>';
            }
        })
        .catch(function (error) {
            showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
            console.error(error);
        });
}

const loadRideLogs = () => {
    let endpointURL = new URL(BASE_LOCAL_URL + '/user/rides');

    fetch(endpointURL.toString(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringifyJSON({"email": retrieveCurrentSession() })
    })
        .then(result => result.json())
        .then(result => {
            let data = result.data;
            let viewContent = document.querySelector('.view-ride-logs-modal .modal-body-content') as HTMLDivElement;

            hideViewModalLoader();

            if (result.status === 200) {
                if (data && data.length > 0) {
                    viewContent.innerHTML = data.map((value: { vehicle_id: string, vehicle_plate_number: string, driver_name: string, vehicle_type: string, vehicle_color: string, log_datetime: string }) => {
                        return `\n<div class="content">
                            <div class="details">
                                <div class="col icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M256 96C256 113.7 270.3 128 288 128C305.7 128 320 113.7 320 96V32H394.8C421.9 32 446 49.08 455.1 74.63L572.9 407.2C574.9 413 576 419.2 576 425.4C576 455.5 551.5 480 521.4 480H320V416C320 398.3 305.7 384 288 384C270.3 384 256 398.3 256 416V480H54.61C24.45 480 0 455.5 0 425.4C0 419.2 1.06 413 3.133 407.2L120.9 74.63C129.1 49.08 154.1 32 181.2 32H255.1L256 96zM320 224C320 206.3 305.7 192 288 192C270.3 192 256 206.3 256 224V288C256 305.7 270.3 320 288 320C305.7 320 320 305.7 320 288V224z" />
                                    </svg>
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
                                        <span id="vehicle_driver_name">${value.driver_name}</span>
                                    </div>
                                    <div class="row">
                                        <span class="label">Color</span>
                                        <span id="vehicle_color">${value.vehicle_color}</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <span class="label">Type</span>
                                        <span id="vehicle_type">${value.vehicle_type}</span>
                                    </div>
                                    <div class="row">
                                        <span class="label">Date & Time</span>
                                        <span id="log-datetime">${value.log_datetime}</span>
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
                    viewContent.innerHTML = '<div class="modal-no-results-found-container" id="modal_no_results_found">No results found.</div>';
                }
            } else {
                viewContent.innerHTML = '<div class="modal-no-results-found-container" id="modal_no_results_found">No results found.</div>';
            }
        })
        .catch(function (error) {
            showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
            console.error(error);
        });
}

const displayRideSchedules = () => {
    showModalLoader();

    delay(() => {
        loadRideSchedules();
    }, 1500);
}

const displayRideLogs = () => {
    showViewModalLoader();

    delay(() => {
        loadRideLogs();
    }, 1500);
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
    displayRideSchedules();
});

buttonCloseSearchService.addEventListener('click', (e) => {
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

buttonCloseViewRideLogs.addEventListener('click', (e) => {
    e.preventDefault();
    hideViewRideLogsContainer();
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

buttonViewRideLogs.addEventListener('click', () => {
    showViewRideLogsContainer();
    displayRideLogs();
});

buttonUpdateProfile.addEventListener('click', () => {
    let employee_id = (<HTMLInputElement> document.getElementsByName('employee_id')[0]).value;
    let display_name = (<HTMLInputElement> document.getElementsByName('display_name')[0]).value;
    let department = (<HTMLInputElement> document.getElementsByName('department')[0]).value;
    let job_role = (<HTMLInputElement> document.getElementsByName('job_role')[0]).value;
    let point_of_origin = (<HTMLInputElement> document.getElementsByName('point_of_origin')[0]).value;
    let onsite_schedule = (<HTMLInputElement> document.getElementsByName('onsite_schedule')[0]).value;
    let specific_onsite_days = Array.from(document.querySelectorAll('#update_specific_onsite_days option:checked')).map(el => (<HTMLInputElement>el).value).join(',');
    let email = (<HTMLInputElement> document.getElementsByName('user_email')[0]).value;
    let password = (<HTMLInputElement> document.getElementsByName('user_password')[0]).value;
    let payload = {
        "employee_id": employee_id,
        "name": display_name,
        "department": department,
        "job_role": job_role,
        "point_of_origin": point_of_origin,
        "onsite_schedule": onsite_schedule,
        "onsite_days": specific_onsite_days,
        "email": email,
        "password": password
    }

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
            } else {
                showAlertStatus(res.title, res.message, 'error');
            }
        })
        .catch(function (error) {
            showAlertStatus('Internal Server Error', 'Something went wrong with connection', 'error');
            console.error(error);
        });
});

inputSearchRideQuery.addEventListener('keyup', (e) => {
    q = (<HTMLInputElement> e.currentTarget).value;
    loadRideSchedules();
});

checkboxFavailYes.addEventListener('click', () => {
    if ((checkboxFavailYes.checked === true && checkboxFavailNo.checked === true) || (checkboxFavailYes.checked === false && checkboxFavailNo.checked === false)) {
        favail = '';
    } else if (checkboxFavailYes.checked === false) {
        favail = "false";
    } else {
        favail = "true";
    }

    loadRideSchedules();
});

checkboxFavailNo.addEventListener('click', () => {
    if ((checkboxFavailYes.checked === true && checkboxFavailNo.checked === true) || (checkboxFavailYes.checked === false && checkboxFavailNo.checked === false)) {
        favail = '';
    } else if (checkboxFavailNo.checked === false) {
        favail = "true";
    } else {
        favail = "false";
    }

    loadRideSchedules();
});

checkboxFdaysMon.addEventListener('click', () => {
    if (checkboxFdaysMon.checked === true) {
        fdays.push(checkboxFdaysMon.value);
    } else {
        fdays = fdays.filter((day: string) => day !== checkboxFdaysMon.value);
    }

    loadRideSchedules();
});

checkboxFdaysTues.addEventListener('click', () => {
    if (checkboxFdaysTues.checked === true) {
        fdays.push(checkboxFdaysTues.value);
    } else {
        fdays = fdays.filter((day: string) => day !== checkboxFdaysTues.value);
    }

    loadRideSchedules();
});

checkboxFdaysWed.addEventListener('click', () => {
    if (checkboxFdaysWed.checked === true) {
        fdays.push(checkboxFdaysWed.value);
    } else {
        fdays = fdays.filter((day: string) => day !== checkboxFdaysWed.value);
    }

    loadRideSchedules();
});

checkboxFdaysThurs.addEventListener('click', () => {
    if (checkboxFdaysThurs.checked === true) {
        fdays.push(checkboxFdaysThurs.value);
    } else {
        fdays = fdays.filter((day: string) => day !== checkboxFdaysThurs.value);
    }

    loadRideSchedules();
});

checkboxFdaysFri.addEventListener('click', () => {
    if (checkboxFdaysFri.checked === true) {
        fdays.push(checkboxFdaysFri.value);
    } else {
        fdays = fdays.filter((day: string) => day !== checkboxFdaysFri.value);
    }

    loadRideSchedules();
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