/** LOCAL STORAGE */
var USER_LOGIN_DATA_KEY = 'user_login_data';
var FROM_LOGIN_TO_SPLASH = 'from_login_to_splash';
var FROM_INDEX_TO_ROUTE_KEY = 'from_index_to_route_key';

/** CONSTANT VALUES */
var DELAY_TIME_IN_MILLISECONDS = 1000;
var regions = Object.keys(location_list);
var account_location_data;

/** API ENDPOINTS */
var LOGIN_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/login';
var SIGN_UP_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/register';
var ENCRYPT_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/encrypt';
var CHECK_ADDRESS_API_ENDPONT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/address';
var FORGOT_PIN_CODE_API_ENDPONT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/forgot';

/** SOURCE LOCATION */
var LOGIN_SOURCE_LOCATION = '../pages/login.html';
var CARPOOLPAGE_SOURCE_LOCATION = '../pages/carpool.html';

/** DOM ELEMENTS */
var login_viewcontroller = document.getElementById('login_viewcontroller');
var sign_up_viewcontroller = document.getElementById('sign_up_viewcontroller');

var user_pin_code = document.getElementById('user_pin_code');
var user_sign_up_email = document.getElementById('user_sign_up_email');
var user_sign_up_mobile_number = document.getElementById('user_sign_up_mobile_number');

var sign_up_view_button = document.getElementById('sign_up_view_button');
var back_to_login_view_button = document.getElementById('back_to_login_view_button');
var login_button = document.getElementById('login_button');
var sign_up_button = document.getElementById('sign_up_button');
var forgot_pin_code_button = document.getElementById('forgot_pin_code_button');

var target_location_landmark = document.getElementById('target_location_landmark');
var target_location_region = document.getElementById('target_location_region');
var target_location_province = document.getElementById('target_location_province');
var target_location_municipality = document.getElementById('target_location_municipality');
var target_location_barangay = document.getElementById('target_location_barangay');
var address_confirm_button = document.getElementById('address_confirm_button');
var address_close_button = document.getElementById('address_close_button');
var landmark_label = document.getElementById('landmark_label');
var address_label = document.getElementById('address_label');
var landmark_field = document.getElementById('landmark_field');
var address_field = document.getElementById('address_field');

function highlightLoginErrorInput(errEmail) {
    user_pin_code.style.borderColor = errEmail ? 'red' : '#ced4da';

    user_pin_code.parentElement.querySelector('.invalid-feedback').style.display = errEmail ? 'block' : 'none';
    user_pin_code.parentElement.querySelector('.invalid-feedback').innerHTML = errEmail ? 'Plase enter a valid pin code' : '';
}

function highlightRegisterErrorInput(errEmail, errMobileNumber, errLocation) {
    user_sign_up_email.style.borderColor = errEmail ? 'red' : '#ced4da';
    user_sign_up_email.parentElement.querySelector('.invalid-feedback').style.display = errEmail ? 'block' : 'none';
    user_sign_up_email.parentElement.querySelector('.invalid-feedback').innerHTML = errEmail ? 'Plase enter a valid email' : '';

    user_sign_up_mobile_number.style.borderColor = errMobileNumber ? 'red' : '#ced4da';
    user_sign_up_mobile_number.parentElement.querySelector('.invalid-feedback').style.display = errMobileNumber ? 'block' : 'none';
    user_sign_up_mobile_number.parentElement.querySelector('.invalid-feedback').innerHTML = errMobileNumber ? 'Please choose a valid mobile number' : '';
}

function loadDefaultSelectedLocationFields() {
    target_location_region.innerHTML = '<option value="" selected disabled>Select a Region</div>';
    target_location_region.innerHTML += regions.map(function (region, i) {
        if (i === 0) {
            return '<option value=\"' + region + '\">' + location_list[region].region_name + '</option>';
        } else {
            return '<option value=\"' + region + '\">' + location_list[region].region_name + '</option>';
        }
    }).join('');
    target_location_landmark.value = '';
    target_location_province.innerHTML = '';
    target_location_province.innerHTML = '<option value="" selected disabled>Select a Province</div>';
    target_location_barangay.innerHTML = '';
    target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    target_location_municipality.innerHTML = '';
    target_location_municipality.innerHTML = '<option value="" selected disabled>Select a Municipality</div>';
    address_confirm_button.disabled = true;
}
function loadPageInDefault() {
    login_viewcontroller.style.display = 'block';
    sign_up_viewcontroller.style.display = 'none';
    login_button.disabled = true;
    sign_up_button.disabled = true;
}

function login(pin_code) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: pin_code })
    };

    fetch(LOGIN_API_ENDPOINT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            if (data.code === 400) {
                showErrorAlertWithConfirmButton(function () {
                    user_pin_code.disabled = false;
                    login_button.disabled = false;
                    sign_up_view_button.disabled = false;
                    forgot_pin_code_button.disabled = false;
                }, 'Error ' + data.code, data.message, 'Close');
            } else {
                localStorage.setItem(USER_LOGIN_DATA_KEY, JSON.stringify(data));
                document.getElementById('splash_screen').style.display = 'block';
                document.getElementById('splash_screen').classList.remove('animate__fadeOut');
                document.getElementById('splash_screen').classList.add('animate__fadeIn');
                localStorage.setItem(FROM_LOGIN_TO_SPLASH, true);
                delay(function () {
                    window.location.href = CARPOOLPAGE_SOURCE_LOCATION;
                }, 3000);
            }
        })
        .catch(function (err) {
            console.error(err);
            showErrorAlertWithConfirmButton(function () {
                window.location.href = LOGIN_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function register(email, mobileNumber, location, landmark, d) {
    var payload = {
        email: email,
        mobileNumber: mobileNumber,
        address: location,
        landmark: landmark,
        lat: d.lat ? d.lat : '',
        lng: d.lng ? d.lng : '',
        kmZero: d.kmZero ? d.kmZero : ''
    }
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(SIGN_UP_API_ENDPOINT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                hideActivityIndicator();

                if (data.code === 400 || data.code === 409) {
                    showErrorAlertWithConfirmButton(function () {
                        sign_up_button.disabled = false;
                        back_to_login_view_button.disabled = false;
                        user_sign_up_email.disabled = false;
                        user_sign_up_mobile_number.disabled = false;
                    }, 'Error ' + data.code, data.message, 'Close');
                } else {
                    sign_up_button.disabled = false;
                    back_to_login_view_button.disabled = false;
                    user_sign_up_email.disabled = false;
                    user_sign_up_mobile_number.disabled = false;
                    showSuccessAlertWithConfirmButton(function () {
                        loadPageInDefault();
                    }, 'Sign Up Successful', 'Please check your Teams for your Pin Code to login', 'Back to Login');
                }
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = LOGIN_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function checkAddress(landmark, location) {
    var payload = {
        address: location,
        landmark: landmark
    }
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(CHECK_ADDRESS_API_ENDPONT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                hideActivityIndicator();

                if (data.code === 400) {
                    showErrorAlertWithConfirmButton(function () {
                        target_location_landmark.disabled = false;
                        target_location_region.disabled = false;
                        target_location_province.disabled = false;
                        target_location_municipality.disabled = false;
                        target_location_barangay.disabled = false;
                        address_confirm_button.disabled = false;
                    }, 'Error 404', 'No location found with address provided', 'Done');
                } else {
                    target_location_landmark.disabled = false;
                    target_location_region.disabled = false;
                    target_location_province.disabled = false;
                    target_location_municipality.disabled = false;
                    target_location_barangay.disabled = false;
                    address_confirm_button.disabled = false;
                    landmark_label.style.color = landmark_field.value ? '#212529': '#cccccc';
                    account_location_data = data;
                }
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = LOGIN_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function forgotPinCode (email) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    };

    fetch(FORGOT_PIN_CODE_API_ENDPONT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                if (data.code === 400) {
                    hideActivityIndicator();
                    showErrorAlertWithConfirmButton(function () {
                        user_pin_code.disabled = false;
                        login_button.disabled = false;
                    }, 'Error ' + data.code, data.message, 'Close');
                } else {
                    hideActivityIndicator();
                    showSuccessAlertWithConfirmButton(function () {
                        user_pin_code.disabled = false;
                        login_button.disabled = false;
                    }, 'New PIN Code sent', 'Please wait for a message via MS Teams', 'Done');
                }
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = LOGIN_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}

function onLoginView() {
    login_viewcontroller.style.display = 'block';
    sign_up_viewcontroller.style.display = 'none';
    user_sign_up_email.value = '';
    user_sign_up_mobile_number.value = '';
    sign_up_button.disabled = true;
    landmark_field.value = "";
    address_field.value = "";
    landmark_label.innerHTML = 'No Landmark';
    address_label.innerHTML = 'Region, province, municipality, barangay';
}
function onRegisterView() {
    login_viewcontroller.style.display = 'none';
    sign_up_viewcontroller.style.display = 'block';
    user_pin_code.value = '';
    login_button.disabled = true;

    new Cleave(user_sign_up_mobile_number, {
        numericOnly: true,
        blocks: [0, 3, 3, 4],
        delimiters: ['', ' ', ' ']
    });

    loadDefaultSelectedLocationFields();
}

function onLoginKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        onLogin();
    }
}
function onRegisterKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        onRegister();
    }
}

function onLoginTyping(e) {
    var email = e.currentTarget.value;

    if (email.length > 0 && event.key !== "Enter") {
        login_button.disabled = false;
        highlightLoginErrorInput(false);
    } else {
        login_button.disabled = true;
    }
}
function onRegisterTyping() {
    var requiredFields = user_sign_up_email.value.length > 0 && user_sign_up_mobile_number.value.length > 0 && landmark_field.value.length > 0 && address_field.value.length > 0;

    if (requiredFields && event.key !== "Enter") {
        sign_up_button.disabled = false;
        highlightRegisterErrorInput(false, false, false);
    } else {
        sign_up_button.disabled = true;
    }
}

function onSelectRegion (selectedRegion) {
    var provinces = Object.keys(location_list[selectedRegion].province_list);

    target_location_province.innerHTML = '';
    target_location_province.innerHTML = '<option value="" selected disabled>Select a Province</div>';
    target_location_barangay.innerHTML = '';
    target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    target_location_municipality.innerHTML = '';
    target_location_municipality.innerHTML = '<option value="" selected disabled>Select a Municipality</div>';
    target_location_province.innerHTML += provinces.map(function (province) {
        return '<option value=\"' + capitalizeWords(province) + '\">' + capitalizeWords(province) + '</option>';
    }).join('');
}

function onSelectProvince (selectedRegion, selectedProvince) {
    var municipalities = Object.keys(location_list[selectedRegion].province_list[selectedProvince.toUpperCase()].municipality_list);

    target_location_municipality.innerHTML = '';
    target_location_municipality.innerHTML = '<option value="" selected disabled>Select a Municipality</div>';
    target_location_barangay.innerHTML = '';
    target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    target_location_municipality.innerHTML += municipalities.map(function (municipality) {
        return '<option value=\"' + capitalizeWords(municipality) + '\">' + capitalizeWords(municipality) + '</option>';
    }).join('');
}

function onSelectMunicipality (selectedRegion, selectedProvince, selectedMunicipality) {
    var barangay =location_list[selectedRegion].province_list[selectedProvince.toUpperCase()].municipality_list[selectedMunicipality.toUpperCase()].barangay_list;

    target_location_barangay.innerHTML = '';
    target_location_barangay.innerHTML = '<option value="" selected disabled>Select a Barangay</div>';
    target_location_barangay.innerHTML += barangay.map(function (barangay) {
        return '<option value=\"' + capitalizeWords(barangay) + '\">' + capitalizeWords(barangay) + '</option>';
    }).join('');
}

function onSelectedRegion (selectedRegion) {
    var provinces = Object.keys(location_list[selectedRegion].province_list);

    target_location_province.innerHTML = '';
    target_location_province.innerHTML = '<option value="" disabled>Select a Province</div>';
    target_location_province.innerHTML += provinces.map(function (province) {
        return '<option value=\"' + capitalizeWords(province) + '\">' + capitalizeWords(province) + '</option>';
    }).join('');
}

function onSelectedProvince (selectedRegion, selectedProvince) {
    var municipalities = Object.keys(location_list[selectedRegion].province_list[selectedProvince.toUpperCase()].municipality_list);

    target_location_municipality.innerHTML = '';
    target_location_municipality.innerHTML = '<option value="" disabled>Select a Municipality</div>';
    target_location_municipality.innerHTML += municipalities.map(function (municipality) {
        return '<option value=\"' + capitalizeWords(municipality) + '\">' + capitalizeWords(municipality) + '</option>';
    }).join('');
}

function onSelectedMunicipality (selectedRegion, selectedProvince, selectedMunicipality) {
    var barangay =location_list[selectedRegion].province_list[selectedProvince.toUpperCase()].municipality_list[selectedMunicipality.toUpperCase()].barangay_list;

    target_location_barangay.innerHTML = '';
    target_location_barangay.innerHTML = '<option value=""  disabled>Select a Barangay</div>';
    target_location_barangay.innerHTML += barangay.map(function (barangay) {
        return '<option value=\"' + capitalizeWords(barangay) + '\">' + capitalizeWords(barangay) + '</option>';
    }).join('');
}   

function onLogin() {
    var pincodePattern = /(^([A-z]|[0-9]){0,6})$/;
    var pincode = user_pin_code.value;

    if (pincodePattern.test(pincode) === true) {
        user_pin_code.disabled = true;
        login_button.disabled = true;
        sign_up_view_button.disabled = true;
        forgot_pin_code_button.disabled = true;

        login(pincode);
    } else {
        highlightLoginErrorInput(true);
    }
}
function onRegister() {
    var emailPattern = /(@cebupacificair.com)/gi;
    var phonePattern = /(9[0-9]{2}\s([0-9]{3}\s)[0-9]{4})/;
    var numberPattern = /(9[0-9]{9})/g;
    var email = user_sign_up_email.value;
    var mobile_number = user_sign_up_mobile_number.value;
    var landmark = landmark_field.value;
    var location = address_field.value;
    var isValidEmail = emailPattern.test(email) === true;
    var isValidMobileNumber = phonePattern.test(mobile_number) === true || numberPattern.test(mobile_number);

    if (isValidEmail & isValidMobileNumber) {
        showActivityIndicator();

        sign_up_button.disabled = true;
        back_to_login_view_button.disabled = true;
        user_sign_up_email.disabled = true;
        user_sign_up_mobile_number.disabled = true;

        register(email, mobile_number, location, landmark, account_location_data);
    } else if (!isValidEmail) {
        highlightRegisterErrorInput(true, false, false);
    } else if (!isValidMobileNumber) {
        highlightRegisterErrorInput(false, true, false);
    } else {
        highlightRegisterErrorInput(true, true, true);
    }
}
function onForgotPinCode() {
    showInputTextFieldAlertWithConfirmAndCancelButton(function(email) {
        showActivityIndicator();
        user_pin_code.disabled = true;
        login_button.disabled = true;
        forgotPinCode(email);
    },  /(@cebupacificair.com)/gi, 'Forgot PIN Code', 'Your Email', 150, 'Send', 'Please choose a valid email');
}

function enableAddressConfirmButton () {
    address_confirm_button.disabled = target_location_landmark.value.length && target_location_region.value && target_location_province.value && target_location_municipality.value && target_location_barangay.value ? false : true;
}

sign_up_view_button.addEventListener('click', onRegisterView);
back_to_login_view_button.addEventListener('click', onLoginView);

user_pin_code.addEventListener("keypress", onLoginKeyPress);
user_sign_up_email.addEventListener('keypress', onRegisterKeyPress);
user_sign_up_mobile_number.addEventListener('keypress', onRegisterKeyPress);

user_pin_code.addEventListener('keyup', onLoginTyping);
user_sign_up_email.addEventListener('keyup', onRegisterTyping);
user_sign_up_mobile_number.addEventListener('keyup', onRegisterTyping);

login_button.addEventListener('click', onLogin);
sign_up_button.addEventListener('click', onRegister);
forgot_pin_code_button.addEventListener('click', onForgotPinCode);

target_location_region.addEventListener('change', function (e) {
    onSelectRegion (e.target.value);

    if (target_location_province.value) {
        onSelectProvince(e.target.value, target_location_province.value);
    }

    if (target_location_province.value && target_location_municipality.value) {
        onSelectMunicipality(e.target.value, target_location_province.value, target_location_municipality.value);
    }

    enableAddressConfirmButton();
});

target_location_province.addEventListener('change', function (e) {
    onSelectProvince(target_location_region.value, e.target.value);

    if (target_location_region.value && target_location_municipality.value) {
        onSelectMunicipality(target_location_region.value, e.target.value, target_location_municipality.value);
    }

    enableAddressConfirmButton();
});

target_location_municipality.addEventListener('change', function (e) {
    if (target_location_region.value && target_location_province.value) {
        onSelectMunicipality(target_location_region.value, target_location_province.value, e.target.value);
    }

    enableAddressConfirmButton();
});

target_location_barangay.addEventListener('change', function () {
    enableAddressConfirmButton();
});

target_location_landmark.addEventListener('keyup', function () {
    enableAddressConfirmButton();
});

address_close_button.addEventListener('click', function () {
    loadDefaultSelectedLocationFields();
});

address_field_change_button.addEventListener('click', function () {
    address_label.innerHTML = address_field.value  ? address_field.value  : 'Region, province, municipality, baranagy';
    landmark_label.innerHTML = landmark_field.value ? landmark_field.value : 'No Landmark';

    target_location_landmark.value = landmark_field.value ? landmark_field.value : '';

    var location = address_field.value  ? address_field.value .split(', ') : '';

    if (location && location.length > 3) {
        target_location_region.innerHTML = '<option value="" disabled>Select a Region</div>';
        target_location_region.innerHTML += regions.map(function (region, i) {
            return '<option value=\"' + region + '\">' + location_list[region].region_name + '</option>';
        }).join('');

        onSelectedRegion(location[0]);
        onSelectedProvince(location[0], location[1]);
        onSelectedMunicipality (location[0], location[1], location[2]);
        target_location_region.value = location[0];
        target_location_province.value = location[1];
        target_location_municipality.value = location[2];
        target_location_barangay.value = location[3];
    } else {
        loadDefaultSelectedLocationFields();
    }
});

address_confirm_button.addEventListener('click', function () {
    landmark_field.value = target_location_landmark.value;
    address_field.value = target_location_region.value + ', ' + target_location_province.value + ', ' + target_location_municipality.value + ', ' + target_location_barangay.value;
    landmark_label.innerHTML = target_location_landmark.value;

    address_label.innerHTML = target_location_region.value + ', ' + target_location_province.value + ', ' + target_location_municipality.value + ', ' + target_location_barangay.value;
    onRegisterTyping();
    showActivityIndicator();
    target_location_landmark.disabled = true;
    target_location_region.disabled = true;
    target_location_province.disabled = true;
    target_location_municipality.disabled = true;
    target_location_barangay.disabled = true;
    address_confirm_button.disabled = true;
    checkAddress(landmark_field.value, address_field.value);
});

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem(FROM_INDEX_TO_ROUTE_KEY)) {
        document.getElementById('splash_screen').style.display = 'block';
        document.getElementById('splash_screen').classList.add('animate__fadeOut');
        localStorage.removeItem(FROM_INDEX_TO_ROUTE_KEY);
    } else {
        document.getElementById('splash_screen').classList.remove('animate__fadeOut');
        document.getElementById('splash_screen').style.display = 'none';
    }

    loadPageInDefault();
});