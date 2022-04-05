"use strict";
var pageLogin = document.querySelector('.login-page');
var pageHome = document.querySelector('.home-page');
var navigationSidebarContainer = document.querySelector('.navigation-side-bar-container');
var mapNavigationContainer = document.querySelector('.map-navigation-container');
var userProfileContainer = document.querySelector('.user-profile-container');
var buttonGoToLoginForm = document.getElementById('go_to_login_form');
var buttonGoToRegiterForm = document.getElementById('go_to_register_form');
var buttonUserLogin = document.getElementById('login_button');
var buttonUserRegister = document.getElementById('register_button');
var buttonNavigationMenu = document.getElementById('navigation_menu_button');
var buttonCloseNavSidebar = document.getElementById('close_nav_side_bar_button');
var buttonUserLogout = document.getElementById('logout_button');
var buttonUserHome = document.getElementById('home_button');
var buttonUserProfile = document.getElementById('profile_button');
var formLogin = document.querySelector('.login-form');
var formRegister = document.querySelector('.register-form');
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
var goToLoginPage = function () {
    showLoginPage();
    hideHomepage();
};
var goToHomePage = function () {
    hideLoginPage();
    showHomepage();
    displayMapNavigation();
};
var loginUser = function () {
    goToHomePage();
};
var logoutUser = function () {
    hideNavSidebar();
    goToLoginPage();
    displayLoginForm();
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
    displayUserProfile();
});
buttonUserLogout.addEventListener('click', function (e) {
    e.preventDefault();
    logoutUser();
});
