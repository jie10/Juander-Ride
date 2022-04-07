/** DOM Elements */
const pageLogin = document.querySelector('.login-page') as HTMLDivElement;
const pageHome = document.querySelector('.home-page') as HTMLDivElement;
const navigationSidebarContainer = document.querySelector('.navigation-side-bar-container') as HTMLDivElement;
const mapNavigationContainer = document.querySelector('.map-navigation-container') as HTMLDivElement;
const userProfileContainer = document.querySelector('.user-profile-container') as HTMLDivElement;
const userQRCodeContainer = document.querySelector('.user-qr-code-container') as HTMLDivElement;
const rideQRCodeContainer = document.querySelector('.ride-qr-code-container') as HTMLDivElement;
const loaderPage = document.getElementById('page_loader') as HTMLDivElement;

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


/** Functions */
const delay = (callback: any, DELAY_TIMEOUT_IN_MILLISECONDS: number) => {
    setTimeout(callback, DELAY_TIMEOUT_IN_MILLISECONDS);
}

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
}

const goToHomePage = () => {
    hideLoginPage();
    showHomepage();
    displayMapNavigation();
}

const loginUser = () => {
    goToHomePage();
}

const logoutUser = () => {
    hideNavSidebar();
    goToLoginPage();
    displayLoginForm();
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
    displayUserProfile();
});

buttonUserLogout.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});