"use strict";
var buttonGoToLoginForm = document.getElementById('go_to_login_form');
var buttonGoToRegiterForm = document.getElementById('go_to_register_form');
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
buttonGoToLoginForm.addEventListener('click', function (e) {
    e.preventDefault();
    showLoginForm();
});
buttonGoToRegiterForm.addEventListener('click', function (e) {
    e.preventDefault();
    showRegisterForm();
});
