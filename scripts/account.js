/** LOCAL STORAGE */
var USER_LOGIN_DATA_KEY = 'user_login_data';
var CURRENT_APP_VERSION_KEY = 'current_app_version';
var USER_BOOKING_KEY = 'user_booking';
var DRIVER_TRIP_KEY = 'driver_trip';
var SHUTTLE_TRIPS_KEY = 'shuttle_trips';
var SHUTTLE_BOOKING_KEY = 'shuttle_booking';
var IS_ADVERTISEMENTS_LOADED_KEY = 'is_advertisements_loaded';
var FROM_LOGOUT_TO_SPLASH = 'from_logout_to_splash';

/** CONSTANT VALUES */
var DELAY_TIME_IN_MILLISECONDS = 1000;
var regions = Object.keys(location_list);
var account_id, account_mobile_number, account_address, account_landmark, account_scoreboard, account_location_data;

var RIDER_BOOKING_HISTORY_API_ENDPONT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book/rider';
var GET_TRIP_BY_ID_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip';
var UPDATE_TRIP_BY_ID_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip';
var DRIVER_BOOKINGS_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book/driver';
var CONFIRM_OR_CANCEL_BOOKING_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book';
var PLAY_BOOKING_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/play';
var CHECK_ADDRESS_API_ENDPONT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/address';
var GET_USER_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/profile';
var UPDATE_USER_INFO_API_ENPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/profile';
var RESET_PIN_CODE_API_ENDPONT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/forgot';

/** SOURCE LOCATION */
var HOMEPAGE_SOURCE_LOCATION = '/';
var ACCOUNTPAGE_SOURCE_LOCATION = '../pages/account.html';

/** COMPONENTS */
var NO_RESULTS_FOUND = "<p class=\"text-muted absolute-center text-center\" style=\"font-weight: 700; font-size: 1rem;\">No results found</p>";

/** DOM ELEMENTS */
var profile_navbar = document.getElementById('profile_navbar');
var secondary_top_navbar = document.getElementById('secondary_top_navbar');
var main_bottom_navbar = document.getElementById('main_bottom_navbar');

var my_trips_button = document.getElementById('my_trips_button');
var my_bookings_button = document.getElementById('my_bookings_button');
var read_faq_button = document.getElementById('read_faq_button');
var settings_button = document.getElementById('settings_button');
var logout_button = document.getElementById('logout_button');
var back_to_previous_page_button = document.getElementById('back_to_previous_page_button');

var account_page_body_container = document.getElementById('account_page_body_container');
var my_trips_container = document.getElementById('my_trips_container');
var my_bookings_container = document.getElementById('my_bookings_container');
var settings_container = document.getElementById('settings_container');
var faqs_container = document.getElementById('faqs_container');

var driver_contact_no = document.getElementById('driver_contact_no');
var update_account_button = document.getElementById('update_account_button');
var reset_pin_code_button = document.getElementById('reset_pin_code_button');

var activity_indicator = document.getElementById('activity_indicator');

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
var address_field_change_button = document.getElementById('address_field_change_button');

function logoutCurrentSession() {
    delay(function () {
        // Clear local storage
        // localStorage.clear();
        localStorage.setItem(FROM_LOGOUT_TO_SPLASH, true);
        localStorage.removeItem(USER_LOGIN_DATA_KEY);
        localStorage.removeItem(CURRENT_APP_VERSION_KEY);
        localStorage.removeItem(USER_BOOKING_KEY);
        localStorage.removeItem(DRIVER_TRIP_KEY);
        localStorage.removeItem(SHUTTLE_TRIPS_KEY);
        localStorage.removeItem(SHUTTLE_BOOKING_KEY);
        localStorage.removeItem(IS_ADVERTISEMENTS_LOADED_KEY);
        
        moveToLoginPage();
    }, DELAY_TIME_IN_MILLISECONDS);
}
function loadDefaultSelectedLocationFields() {
    target_location_region.innerHTML = regions.map(function (region, i) {
        if (i === 0) {
            return '<option value=\"' + region + '\" selected>' + location_list[region].region_name + '</option>';
        } else {
            return '<option value=\"' + region + '\">' + location_list[region].region_name + '</option>';
        }
    }).join('');

    onSelectRegion(target_location_region.value, target_location_province.value);
    onSelectProvince(target_location_region.value, target_location_province.value, target_location_municipality.value);
    onSelectMunicipality (target_location_region.value, target_location_province.value, target_location_municipality.value, target_location_barangay.value);
}

function getResJSON(result) {
    return result.json();
}
function getStatusIndicator(status) {
    switch(status) {
        case 0:
            return {
                trip_status: 'Pending',
                withButtons: true,
                backgroundColor: '#fff6ee',
                color: '#f78e33',
                origin: 'Coming from ',
                destination: 'Going to ',
                target_location: 'Target location is ',
                action: 'On trip with '
            }
        case 1:
            return {
                trip_status: 'Confirmed',
                withButtons: false,
                backgroundColor: '#ecf5e4',
                color: '#5aa949',
                origin: 'Coming from ',
                destination: 'Going to ',
                target_location: 'Target location is ',
                action: 'On trip with '
            }
        case 2:
            return {
                trip_status: 'Cancelled',
                withButtons: false,
                backgroundColor: '#e2e3e2',
                color: '#858586',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        case 3:
            return {
                trip_status: 'Completed',
                withButtons: false,
                backgroundColor: '#bafff6',
                color: '#009883',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        case 4:
            return {
                trip_status: 'Ongoing',
                withButtons: false,
                backgroundColor: '#eaf6f8',
                color: '#0061a8',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        default: return null;
    }
}
function getBookingStatusIndicator(status) {
    switch(status) {
        case 0:
            return {
                trip_status: 'Pending',
                withButtons: true,
                backgroundColor: '#fff6ee',
                color: '#f78e33',
                origin: 'Coming from ',
                destination: 'Going to ',
                target_location: 'Target location is ',
                action: 'On trip with '
            }
        case 1:
            return {
                trip_status: 'Confirmed',
                withButtons: false,
                backgroundColor: '#ecf5e4',
                color: '#5aa949',
                origin: 'Coming from ',
                destination: 'Going to ',
                target_location: 'Target location is ',
                action: 'On trip with '
            }
        case 2:
            return {
                trip_status: 'Cancelled',
                withButtons: false,
                backgroundColor: '#e2e3e2',
                color: '#858586',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        case 3:
            return {
                trip_status: 'Ongoing',
                withButtons: false,
                backgroundColor: '#eaf6f8',
                color: '#0061a8',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        case 4:
            return {
                trip_status: 'Completed',
                withButtons: false,
                backgroundColor: '#bafff6',
                color: '#009883',
                origin: 'Came from ',
                destination: 'Went to ',
                target_location: 'Target location was ',
                action: 'Shared ride with '
            }
        default: return null;
    }
}
function moveToLoginPage() {
    window.location.href = HOMEPAGE_SOURCE_LOCATION;
}

function showProfileNavbar() {
    profile_navbar.style.display = 'flex';
    secondary_top_navbar.style.display = 'none';
}
function showSecondaryTopNavbar() {
    profile_navbar.style.display = 'none';
    secondary_top_navbar.style.display = 'flex';
}
function showMainAccountPageContainer() {
    account_page_body_container.style.display = 'block';
    my_trips_container.style.display = 'none';
    my_bookings_container.style.display = 'none';
    settings_container.style.display = 'none';
    faqs_container.style.display = 'none';
}
function showMyTripsPageContainer() {
    account_page_body_container.style.display = 'none';
    my_trips_container.style.display = 'block';
}
function showMyBookingsPageContainer() {
    account_page_body_container.style.display = 'none';
    my_bookings_container.style.display = 'block';
}
function showFAQsPageContainer() {
    account_page_body_container.style.display = 'none';
    faqs_container.style.display = 'block';
}

/** TEMPORARY FILE */
function showActivityIndicator() {
    activity_indicator.style.visibility = "visible";
}
function hideAllPageContainers() {
    account_page_body_container.style.display = 'none';
    my_bookings_container.style.display = 'none';
    my_trips_container.style.display = 'none';
    faqs_container.style.display = 'none';
    settings_container.style.display = 'none';
}
function hideActivityIndicator() {
    activity_indicator.style.visibility = "collapse";
}

function hideMainBottomNavbar() {
    main_bottom_navbar.style.display = 'none';
}

function reloadCurrentPage() {
    showProfileNavbar();
    showMainBottomNavbar();
    hideAllPageContainers();
    account_page_body_container.style.display = 'block';
}

function loadBookingButtons(e) {
    var element = e.id.split('_');
    var _id = element[0];
    var tripID = element[1];
    var status = element[2];

    if (parseInt(status) === 0) {
        showQuestionAlertWithDenyAndCloseButton(function () {
            onConfirmBooking(_id, tripID);
        }, function () {
            onCancelBooking(_id, tripID);
        }, 'Booking Request', 'Would you like to confirm or cancel this request?', 'Confirm', 'Cancel');
    } else {}
}
function loadUserDetails() {
    var user_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

    document.querySelector('.user-name').innerHTML = user_data.displayName ? user_data.displayName : user_data.email;
    document.querySelector('.user-role').innerHTML = user_data.jobTitle ? user_data.jobTitle : 'CEB employee';
    document.querySelector('.user-position').innerHTML = user_data.jobTitle ? user_data.jobTitle : 'Cebu Pacifir Air, Inc.';

    document.querySelector('.points-count').innerHTML = account_scoreboard && account_scoreboard.points ? account_scoreboard.points : 0;
    document.querySelector('.dtp-count').innerHTML = account_scoreboard && account_scoreboard.dtp ? account_scoreboard.dtp : 0;
    document.querySelector('.badges-count').innerHTML = account_scoreboard && account_scoreboard.badges ? account_scoreboard.badges : 0;
    document.querySelector('.items-count').innerHTML = account_scoreboard && account_scoreboard.items ? account_scoreboard.items : 0;
}
function getRiderBookingsHistory() {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };
    
    fetch(RIDER_BOOKING_HISTORY_API_ENDPONT + '/' + email.toLowerCase(), options)
        .then(getResJSON)
        .then(function (data) {
            delay(function () {
                hideActivityIndicator();
                showMyTripsPageContainer();

                if (data && data.length > 0) {
                    sortDateTime(data, 'desc', 'updatedAt');
                    my_trips_container.innerHTML = '<div class=\"tripHistory-list container\">' +
                                                        data.map(function (val) { 
                                                            var _id = val._id;
                                                            var timeFromNowFormat = moment(val.departTime).utc().format('MMMM D, YYYY  h:mm a');
                                                            var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
                                                            var drivernameArr = val.drivername.split(' ');
                                                            var destination = val.destination;
                                                            var bookingStatus = getBookingStatusIndicator(val.status);
                                                            var bookingName = (val.booktype === 0 ? capitalize(drivernameArr[drivernameArr.length - 1]) : capitalize(destination.split(' ')[0])) + ' Ride';

                                                            return '<div class=\"list-item\" id=\"' + _id + '\">'
                                                                        + '<div class=\"row d-flex align-items-center header\">'
                                                                            + '<div class=\"col heading\">' + bookingName + '</div>'
                                                                            + "<div class='col-2 status' style='background-color: "+bookingStatus.backgroundColor+"; color: "+bookingStatus.color+"'>" + bookingStatus.trip_status + '</div>'
                                                                        + '</div>'
                                                                        + '<div>'
                                                                            + '<p class=\"datetime\">'  + capitalize(timeFromNow) + ' ' + timeFromNowFormat + '</p>'
                                                                        + '</div>'
                                                                        + '<p class=\"destination\">' + destination + '</p>'
                                                                        //+ '<p class=\"seat-number\">' + val.seatCount + '/' + val.seats + (val.seatCount === 1 ? ' seat' : ' seats') + '</p>'
                                                                    + '</div>';
                                                        }).join('');
                                                    + '</div>';
                } else {
                    my_trips_container.innerHTML = NO_RESULTS_FOUND;
                }
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = ACCOUNTPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function getDriverBookings() {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(DRIVER_BOOKINGS_API_ENDPOINT + '/' + email.toLowerCase(), options)
        .then(getResJSON)
        .then(function (data) {
            delay(function () {
                hideActivityIndicator();
                showMyBookingsPageContainer();

                if (data && data.length > 0) {
                    sortDateTime(data, 'desc', 'updatedAt');
                    my_bookings_container.innerHTML = '<div class=\"tripHistory-list container\">' +
                                                        data.map(function (val) { 
                                                            var timeFromNowFormat = moment(val.departTime).utc().format('MMMM D YYYY  h:mm a');
                                                            var timeFromNow = moment(new Date(timeFromNowFormat)).fromNow();
                                                            var _id = val._id;
                                                            var drivernameArr = val.drivername.split(' ');
                                                            var ridernameArr = val.ridername.split(' ');
                                                            var destination = val.destination;
                                                            var bookingStatus = getBookingStatusIndicator(val.status);
                                                            var bookingRiderAction = capitalize(ridernameArr[ridernameArr.length - 1]) + '\'s trip ' + bookingStatus.trip_status;
                                                            var bookingName = (val.booktype === 0 ? capitalize(drivernameArr[drivernameArr.length - 1]) : capitalize(destination.split(' ')[0])) + ' Ride';
                                                            var tripID = val.tripID;

                                                            return '<div class=\"list-item\" style=\"' + (val.status === 0 ? 'cursor: pointer;' : 'cursor: default;') + '\" id=\"' + _id + '_' + tripID + '_' + val.status + '\" onclick=\"loadBookingButtons(this)\">'
                                                                        + '<div class=\"row d-flex align-items-center header\">'
                                                                            + '<div class=\"col heading\">' + bookingRiderAction + '</div>'
                                                                            + "<div class='col-2 status' style='background-color: "+bookingStatus.backgroundColor+"; color: "+bookingStatus.color+"'>" + bookingStatus.trip_status + '</div>'
                                                                        + '</div>'
                                                                        + '<div>'
                                                                            + '<p class=\"datetime\">'  + capitalize(timeFromNow) + ' ' + timeFromNowFormat + '</p>'
                                                                        + '</div>'
                                                                        + '<p class=\"destination\">' + destination + '</p>'
                                                                        + '<input type=\"hidden\" class=\"rider-email\" id=\"' + _id + '_rider' +'\" value=\"' + val.email + '\"/>'
                                                                        //+ '<p class=\"seat-number\">' + val.seatCount + '/' + val.seats + (val.seatCount === 1 ? ' seat' : ' seats') + '</p>'
                                                                        + '<p class=\"booked-by\">' + 'Booked by ' + val.ridername + '</p>'
                                                                    + '</div>';
                                                        }).join('');
                                                    + '</div>';
                } else {
                    my_bookings_container.innerHTML = NO_RESULTS_FOUND;
                }
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = ACCOUNTPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function confirmOrCancelBooking(_id, status, tripID) {
    var email = document.getElementById(_id + '_rider').innerHTML;

    var payload = {
        "status": status
    };
    var options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    showActivityIndicator();
    hideAllPageContainers();

    fetch(CONFIRM_OR_CANCEL_BOOKING_API_ENDPOINT + '/' + _id, options)
        .then(getResJSON)
        .then(function (data) {
            fetch(GET_TRIP_BY_ID_API_ENDPOINT + '/' + tripID)
                .then(getResJSON)
                .then(function (data) {
                    hideActivityIndicator();

                    if (data) {
                        var riders = data.riders;
                        var temp = data.temp;
                        var seats = data.seats;
                        var newPayload = {
                            seats: seats + 1,
                            temp: temp.filter(function (rider) {
                                return rider !== email;
                            }),
                            riders: riders
                        };
        
                        if (status === 1) {
                            riders.push(email);
                            newPayload  = {
                                seats: seats,
                                temp: temp.filter(function (rider) {
                                    return rider !== email;
                                }),
                                riders: riders
                            } 
                        }
                        var newOptions = {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newPayload)
                        };

                        fetch(UPDATE_TRIP_BY_ID_API_ENDPOINT + '/' + tripID, newOptions)
                            .then(function (result) {
                                return result.json();
                            })
                            .then(function (data) {
                                showSuccessAlertWithConfirmButton(function () {
                                    onMyBookings();
                                }, (status === 1 ? 'Booking has been confirmed' : 'Booking has been cancelled'), '', 'Done');
                            })
                            .catch(function (err) {
                                console.error(err);
                                hideActivityIndicator();
                                showErrorAlertWithConfirmButton(function () {
                                    window.location.href = ACCOUNTPAGE_SOURCE_LOCATION;
                                }, 'Error 500', 'Internal server error', 'Refresh');
                            });
                    }
                })
                .catch(function (err) {
                    console.error(err);
                    hideActivityIndicator();
                    showErrorAlertWithConfirmButton(function () {
                        window.location.href = ACCOUNTPAGE_SOURCE_LOCATION;
                    }, 'Error 500', 'Internal server error', 'Refresh');
                });
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = ACCOUNTPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function resetPinCode (email) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    };

    fetch(RESET_PIN_CODE_API_ENDPONT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                if (data.code === 400) {
                    hideActivityIndicator();
                    showErrorAlertWithConfirmButton(function () {
                        driver_contact_no.disabled = false;
                        update_account_button.disabled = false;
                        address_field_change_button.disabled = false;
                        reset_pin_code_button.disabled = false;
                    }, 'Error ' + data.code, data.message, 'Close');
                } else {
                    hideActivityIndicator();
                    showSuccessAlertWithConfirmButton(function () {
                        driver_contact_no.disabled = false;
                        update_account_button.disabled = false;
                        address_field_change_button.disabled = false;
                        reset_pin_code_button.disabled = false;
                        showActivityIndicator();
                        logoutCurrentSession();
                    }, 'New PIN Code sent', 'Please wait for a message via MS Teams', 'Done');
                }
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = ACCOUNTPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}
function getUserInfo() {
    fetch(GET_USER_API_ENDPOINT + '/' + JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                showMainAccountPageContainer();
                hideActivityIndicator();
                account_id = data._id;
                account_mobile_number = data.mobileNumber;
                account_address = data.address;
                account_landmark = data.landmark;
                account_scoreboard = data.scoreboard;

                loadUserDetails();
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
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
                    account_location_data = data;
                }
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}

function updateUserInfo(account_id, mobileNumber, landmark, address, d) {
    var payload = {
        mobileNumber: mobileNumber,
        landmark: landmark,
        address: address,
        lat: d.lat ? d.lat : '',
        lng: d.lng ? d.lng : '',
        kmZero: d.kmZero ? d.kmZero : ''
    };
    var options = {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    };

    fetch(UPDATE_USER_INFO_API_ENPOINT + '/' + account_id, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            delay(function () {
                hideActivityIndicator();
        
                driver_contact_no.disabled = false;
                update_account_button.disabled = false;
        
                if (data.code === 400) {
                    showErrorAlertWithConfirmButton(function () {
                        sign_up_button.disabled = false;
                        back_to_login_view_button.disabled = false;
                        user_sign_up_email.disabled = false;
                        user_sign_up_mobile_number.disabled = false;
                    }, 'Error 400', 'Account update failed', 'Done');
                } else {
                    var user_login_data = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

                    user_login_data.mobileNumber = mobileNumber;
                    user_login_data.address = address;
                    user_login_data.landmark = landmark;
                    user_login_data.kmZero = d.kmZero;
                    user_login_data.lat = d.lat;
                    user_login_data.lng = d.lng;

                    localStorage.setItem(USER_LOGIN_DATA_KEY, JSON.stringify(user_login_data));

                    showSuccessAlertWithConfirmButton(function () {
                        reloadCurrentPage();
                    }, 'Account Updated Successfully', '', 'Done');
                }
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = HOMEPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}

function confirmOrCancelTripBooking(bookingID, tripID, userEmail, bookingStatus){
    var payload = {
        "email": userEmail,
        "bookID": bookingID,
        "tripID": tripID,
        "status": bookingStatus
    };
    var options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    };

    showActivityIndicator();

    fetch(PLAY_BOOKING_API_ENDPOINT, options)
        .then(getResJSON)
        .then(function (data) {
            delay(function () {
                window.location.href = ACCOUNTPAGE_SOURCE_LOCATION;
            }, DELAY_TIME_IN_MILLISECONDS);
        })
        .catch(function (err) {
            console.error(err);
            hideActivityIndicator();
            showErrorAlertWithConfirmButton(function () {
                window.location.href = ACCOUNTPAGE_SOURCE_LOCATION;
            }, 'Error 500', 'Internal server error', 'Refresh');
        });
}

function onConfirmBooking(_id, tripID) {
    var riderEmail = document.getElementById(_id + '_rider').value;

    showActivityIndicator();
    confirmOrCancelTripBooking(_id, tripID, riderEmail, 1);
}
function onCancelBooking(_id, tripID) {
    var riderEmail = document.getElementById(_id + '_rider').value;

    showActivityIndicator();
    confirmOrCancelTripBooking(_id, tripID, riderEmail, 2);
}

function onUpdateAccount() {
    var phonePattern = /(9[0-9]{2}\s([0-9]{3}\s)[0-9]{4})/;

    var inPhoneFormat = phonePattern.test(driver_contact_no.value);

    if (!inPhoneFormat) {
        showErrorAlert('Invalid phone number format', 'Phone number should be in this format: 9xx xxx xxxx or 9xxxxxxxxx');
    } else {
        showQuestionAlertWithButtons(function () {
            driver_contact_no.disabled = true;
            update_account_button.disabled = true;

            showActivityIndicator();
            updateUserInfo(account_id, driver_contact_no.value, landmark_field.value, address_field.value, account_location_data);
        }, 'Update Account', 'Are you sure you want to continue?', 'Yes', 'No');
    }
}

function onResetPinCode() {
    showInputTextFieldAlertWithConfirmAndCancelButton(function(email) {
        showActivityIndicator();
        driver_contact_no.disabled = true;
        update_account_button.disabled = true;
        address_field_change_button.disabled = true;
        reset_pin_code_button.disabled = true;
        resetPinCode(email);
    },  /(@cebupacificair.com)/gi, 'Reset PIN Code', 'Your Email', 150, 'Send', 'Please choose a valid email');
}

function onUpdateAccountRequiredFields() {
    var requiredFields = driver_contact_no.value.length > 0 && landmark_field.value.length > 0 && address_field.value.length > 0;

    if (requiredFields) {
        update_account_button.disabled = false;
    } else {
        update_account_button.disabled = true;
    }
}

function onMyTrips() {
    showSecondaryTopNavbar();
    hideMainBottomNavbar();
    hideAllPageContainers();
    showActivityIndicator();
    getRiderBookingsHistory();
}
function onMyBookings() {
    showSecondaryTopNavbar();
    hideMainBottomNavbar();
    hideAllPageContainers();
    showActivityIndicator();
    getDriverBookings();
}
function onFAQs() {
    showSecondaryTopNavbar();
    hideMainBottomNavbar();
    hideAllPageContainers();
    showActivityIndicator();

    delay(function () {
        hideActivityIndicator();
        faqs_container.style.display = 'block';
    }, DELAY_TIME_IN_MILLISECONDS);
}
function onSettings() {
    showSecondaryTopNavbar();
    hideMainBottomNavbar();
    hideAllPageContainers();
    showActivityIndicator();

    delay(function () {
        hideActivityIndicator();
        settings_container.style.display = 'block';

        new Cleave(driver_contact_no, {
            numericOnly: true,
            blocks: [0, 3, 3, 4],
            delimiters: ['', ' ', ' ']
        });

        driver_contact_no.value = account_mobile_number ? account_mobile_number : '';
        update_account_button.disabled = account_mobile_number && account_address && account_landmark ? false : true;

        landmark_field.value = account_landmark ? account_landmark : '';
        address_field.value = account_address ? account_address : '';

        address_label.innerHTML = account_address ? account_address : 'Region, province, municipality, baranagy';
        landmark_label.innerHTML = account_landmark ? account_landmark : 'No Landmark';
        landmark_label.style.color = account_landmark ? '#212529': '#cccccc';
        target_location_landmark.value = landmark_field.value = account_landmark ? account_landmark : '';

        var location = account_address ? account_address.split(', ') : '';

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
    }, DELAY_TIME_IN_MILLISECONDS);
}
function onAccountPage() {
    // showSecondaryTopNavbar();
    // hideMainBottomNavbar();
    // hideAllPageContainers();
    // showActivityIndicator();

    // delay(function () {
    //     hideActivityIndicator();
    //     faqs_container.style.display = 'block';
    // }, DELAY_TIME_IN_MILLISECONDS);
}
function onLogout() {
    showQuestionAlertWithButtons(function () {
        showActivityIndicator();
        logoutCurrentSession();
    }, 'Log out', 'Are you sure you want to continue?', 'Yes', 'No');
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

function enableAddressConfirmButton () {
    address_confirm_button.disabled = target_location_landmark.value.length && target_location_region.value && target_location_province.value && target_location_municipality.value && target_location_barangay.value ? false : true;
}

back_to_previous_page_button.addEventListener('click', reloadCurrentPage);
my_trips_button.addEventListener('click', onMyTrips);
my_bookings_button.addEventListener('click', onMyBookings);
read_faq_button.addEventListener('click', onFAQs);
settings_button.addEventListener('click', onSettings);
logout_button.addEventListener('click', onLogout);

driver_contact_no.addEventListener('keyup', onUpdateAccountRequiredFields);
update_account_button.addEventListener('click', onUpdateAccount);
reset_pin_code_button.addEventListener('click', onResetPinCode);

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

address_confirm_button.addEventListener('click', function () {
    landmark_field.value = target_location_landmark.value;
    address_field.value = target_location_region.value + ', ' + target_location_province.value + ', ' + target_location_municipality.value + ', ' + target_location_barangay.value;
    landmark_label.innerHTML = target_location_landmark.value;
    address_label.innerHTML = target_location_region.value + ', ' + target_location_province.value + ', ' + target_location_municipality.value + ', ' + target_location_barangay.value;
    onUpdateAccountRequiredFields();
    showActivityIndicator();
    target_location_landmark.disabled = true;
    target_location_region.disabled = true;
    target_location_province.disabled = true;
    target_location_municipality.disabled = true;
    target_location_barangay.disabled = true;
    address_confirm_button.disabled = true;
    checkAddress(landmark_field.value, address_field.value);
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

    enableAddressConfirmButton();
})

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.account-page-container').style.display = 'none';

    showActivityIndicator();

    if (checkCurrentSession()) {
        checkAppVersion(function () {
            document.querySelector('.account-page-container').style.display = 'block';
            getUserInfo();
            reloadCurrentPage();
        }, moveToLoginPage);
    } else {
        moveToLoginPage();
        localStorage.removeItem(CURRENT_APP_VERSION_KEY);
    }
});