/** DOM Elements */
const pageLogin = document.querySelector('.login-page') as HTMLDivElement;
const pageHome = document.querySelector('.home-page') as HTMLDivElement;
const navigationSidebarContainer = document.querySelector('.navigation-side-bar-container') as HTMLDivElement;
const mapNavigationContainer = document.querySelector('.map-navigation-container') as HTMLDivElement;
const userProfileContainer = document.querySelector('.user-profile-container') as HTMLDivElement;

const buttonGoToLoginForm = document.getElementById('go_to_login_form') as HTMLButtonElement;
const buttonGoToRegiterForm = document.getElementById('go_to_register_form') as HTMLButtonElement;
const buttonUserLogin = document.getElementById('login_button') as HTMLButtonElement;
const buttonUserRegister = document.getElementById('register_button') as HTMLButtonElement;
const buttonNavigationMenu = document.getElementById('navigation_menu_button') as HTMLButtonElement;
const buttonCloseNavSidebar = document.getElementById('close_nav_side_bar_button') as HTMLButtonElement;
const buttonUserLogout = document.getElementById('logout_button') as HTMLButtonElement;
const buttonUserHome = document.getElementById('home_button') as HTMLButtonElement;
const buttonUserProfile = document.getElementById('profile_button') as HTMLButtonElement;

const formLogin = document.querySelector('.login-form') as HTMLDivElement;
const formRegister = document.querySelector('.register-form') as HTMLDivElement;


/** Functions */
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
})