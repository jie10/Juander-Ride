"use strict";
var pageLogin = document.querySelector('.login-page');
var pageHome = document.querySelector('.home-page');
var buttonGoToLoginForm = document.getElementById('go_to_login_form');
var buttonGoToRegiterForm = document.getElementById('go_to_register_form');
var buttonUserLogin = document.getElementById('login_button');
var buttonUserRegister = document.getElementById('register_button');
var formLogin = document.querySelector('.login-form');
var formRegister = document.querySelector('.register-form');
var showLoginForm = function () {
    formLogin.style.display = "block";
    formRegister.style.display = "none";
};
var showRegisterForm = function () {
    formLogin.style.display = "none";
    formRegister.style.display = "block";
};
var goToLoginPage = function () {
    pageLogin.style.display = "block";
    pageHome.style.display = "none";
};
var goToHomePage = function () {
    pageLogin.style.display = "none";
    pageHome.style.display = "block";
};
buttonUserLogin.addEventListener('click', function () {
    goToHomePage();
});
buttonUserRegister.addEventListener('click', function () {
    goToHomePage();
});
buttonGoToLoginForm.addEventListener('click', function (e) {
    e.preventDefault();
    showLoginForm();
});
buttonGoToRegiterForm.addEventListener('click', function (e) {
    e.preventDefault();
    showRegisterForm();
});
