/** DOM Elements */
const buttonGoToLoginForm = document.getElementById('go_to_login_form') as HTMLButtonElement;
const buttonGoToRegiterForm = document.getElementById('go_to_register_form') as HTMLButtonElement;

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


/** DOM Events */
buttonGoToLoginForm.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
});

buttonGoToRegiterForm.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterForm();
});