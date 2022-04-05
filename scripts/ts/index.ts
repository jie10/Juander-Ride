/** DOM Elements */
const pageLogin = document.querySelector('.login-page') as HTMLDivElement;
const pageHome = document.querySelector('.home-page') as HTMLDivElement;

const buttonGoToLoginForm = document.getElementById('go_to_login_form') as HTMLButtonElement;
const buttonGoToRegiterForm = document.getElementById('go_to_register_form') as HTMLButtonElement;
const buttonUserLogin = document.getElementById('login_button') as HTMLButtonElement;
const buttonUserRegister = document.getElementById('register_button') as HTMLButtonElement;

const formLogin = document.querySelector('.login-form') as HTMLDivElement;
const formRegister = document.querySelector('.register-form') as HTMLDivElement;


/** Functions */
const showLoginForm = () => {
    formLogin.style.display = "block";
    formRegister.style.display = "none";
}

const showRegisterForm = () => {
    formLogin.style.display = "none";
    formRegister.style.display = "block";
}

const goToLoginPage = () => {
    pageLogin.style.display = "block";
    pageHome.style.display = "none";
}

const goToHomePage = () => {
    pageLogin.style.display = "none";
    pageHome.style.display = "block";
}


/** DOM Events */
buttonUserLogin.addEventListener('click', () => {
    goToHomePage();
});

buttonUserRegister.addEventListener('click', () => {
    goToHomePage();
});

buttonGoToLoginForm.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
});

buttonGoToRegiterForm.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterForm();
});