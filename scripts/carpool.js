/** FIND CARPOOL */
var find_pool_rider_button = document.getElementById('find_pool_rider_button');
var more_carpool_buttons = document.getElementById('more_carpool_buttons');
var find_carpool_navigate_container = document.getElementById('find_carpool_navigate_container');
var driver_pool_results_container = document.getElementById('driver_pool_results_container');
var search_pick_up_point = document.getElementById('search_pick_up_point');
var search_drop_off_point = document.getElementById('search_drop_off_point');
var is_to_drop_switch = document.getElementById('is_to_drop_switch');
var main_top_navbar = document.getElementById('main_top_navbar');
var main_bottom_navbar = document.getElementById('main_bottom_navbar');
var secondary_top_navbar = document.getElementById('secondary_top_navbar');
var carpool_page_loader = document.getElementById('carpool_page_loader');
var carpool_container = document.getElementById('carpool_container');
var shuttle_container = document.getElementById('shuttle_container');
var user_account_container = document.getElementById('user_account_container');
var carpool_ride_list_container = document.getElementById('carpool_ride_list_container');
var share_a_ride_container = document.getElementById('share_a_ride_container');
var carpool_main_page = document.getElementById('carpool_main_page');
var error_page = document.getElementById('error_page');
var carpool_tab_button = document.getElementById('carpool_tab_button');
var shuttle_tab_button = document.getElementById('shuttle_tab_button');
var user_account_tab_button = document.getElementById('user_account_tab_button');
var carpool_ride_list_button = document.getElementById('carpool_ride_list_button');
var share_a_ride_button = document.getElementById('share_a_ride_button');
var back_to_previous_page_button = document.getElementById('back_to_previous_page_button'); 
var carpool_ride_list_button = document.getElementById('carpool_ride_list_button');
var show_confirm_carpool_rider = document.getElementById('show_confirm_carpool_rider');
var join_pool_rider_button = document.getElementById('join_pool_rider_button');
var carpool_on_trip_container = document.getElementById('carpool_on_trip_container');
var trip_completed_button = document.getElementById('trip_completed_button');
var trip_completed_container = document.getElementById('trip_completed_container');


/** SHARE-A-RIDE */
var share_ride_navigate_container = document.getElementById('share_ride_navigate_container');
var share_pool_ride_button_rider = document.getElementById('share_pool_ride_button_rider');
var search_pick_up_point_rider = document.getElementById('search_pick_up_point_rider');
var search_drop_off_point_rider = document.getElementById('search_drop_off_point_rider');
var is_to_drop_switch_rider = document.getElementById('is_to_drop_switch_rider');
var create_trip_container = document.getElementById('create_trip_container');
var share_ride_navigate_container = document.getElementById('share_ride_navigate_container');
var driver_target_location = document.getElementById('driver_target_location');
var driver_available_seats = document.getElementById('driver_available_seats');
var driver_departure_date = document.getElementById('driver_departure_date');
var driver_departure_time = document.getElementById('driver_departure_time');
var driver_contact_no = document.getElementById('driver_contact_no');
var on_trip_driver_container = document.getElementById('on_trip_driver_container');


var COMPLETE_TRIP_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip';
var MATCH_TRIP_DYNAMIC_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/match/trip';
var BOOK_RIDE_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book';
var CREATE_TRIP_API_ENDPOINT = 'https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/trip';
var USER_LOGIN_DATA_KEY = 'user_login_data';
var CREATED_TRIP_KEY = 'created_trip';
var PAGE_LOAD_SPINNER = "<div class=\"absolute-center page-loader\">" +
                        "<div class=\"spinner-border\" style=\"width: 3rem; height: 3rem;\" role=\"status\">" +
                            "<span class=\"visually-hidden\">Loading...</span>" +
                        "</div>" +
                    "</div>";
var NO_RESULTS_FOUND = "<p class=\"text-muted absolute-center text-center\">No results found.</p>";


function delay(callback, TIMEOUT_IN_SECONDS) {
    setTimeout(callback, TIMEOUT_IN_SECONDS);
}

function showTimedAlertMessage(title, message, status, TIMEOUT_IN_SECONDS) {
    var Alert = Swal.mixin({
        showConfirmButton: false,
        timer: TIMEOUT_IN_SECONDS,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    Alert.fire(title, message, status);
}
function showErrorPage (error) {
    console.error(error.message);
    error_page.style.display = 'block';
    error_page.innerHTML = '<p class="text-muted absolute-center text-center">' + error.message + '</p>';
}
function checkCurrentSession() {
    var email = localStorage.getItem(USER_LOGIN_DATA_KEY);

    if (email) {
        document.querySelector('.carpool-page-container').style.display = 'block';
        reloadCarpoolPage(); 
    } else {
        moveToLoginpage();
    }
}
function moveToLoginpage() {
    window.location.href = '../index.html';
}
function showCarpoolPageLoader () {
    carpool_page_loader.style.display = 'flex';
}
function showMainBottomNavbar () {
    main_bottom_navbar.style.display = 'block';
}
function showToastMessage (title, status, TIMEOUT_IN_SECONDS) {
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: TIMEOUT_IN_SECONDS,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: status,
        title: title
    });
}
function showMainTopNavbar() {
    main_top_navbar.style.display = 'flex';
    secondary_top_navbar.style.display = 'none';
}
function showSecondaryTopNavbar() {
    main_top_navbar.style.display = 'none';
    secondary_top_navbar.style.display = 'flex';
}


/** FIND CARPOOL */
function showCarpoolRideListContainer() {
    carpool_ride_list_container.style.display = 'block';
    share_a_ride_container.style.display = 'none';
}
function showFindCarpoolNavigateContainer() {
    find_carpool_navigate_container.style.display ='block';
    driver_pool_results_container.style.display = "none";
}
function showDriverPoolListContainer() {
    find_carpool_navigate_container.style.display = "none";
    driver_pool_results_container.style.display ='block';
}
function showMoreCarpoolButtonsContainer () {
    more_carpool_buttons.style.display = 'flex';
}
function showCarpoolOnTripContainer () {
    carpool_on_trip_container.style.display = 'block';
    find_carpool_navigate_container.style.display = "none";
}
function showTripCompleted () {
    carpool_on_trip_container.style.display = 'none';
    trip_completed_container.style.display = 'block';
}


/** SHARE-A-RIDE */
function showShareARideContainer() {
    carpool_ride_list_container.style.display = 'none';
    share_a_ride_container.style.display = 'block';
}
function showShareRideNavigateContainer() {
    create_trip_container.style.display = 'none';
    share_ride_navigate_container.style.display ='block';
    on_trip_driver_container.style.display = 'none';
}
function showCreateTripContainer() {
    create_trip_container.style.display = 'block';
    share_ride_navigate_container.style.display ='none';
    on_trip_driver_container.style.display = 'none';
}
function showOnTripDriverContainer() {
    on_trip_driver_container.style.display = 'block';
}


function hideErrorPage () {
    error_page.style.display = 'none';
}
function hideCarpoolPageLoader () {
    carpool_page_loader.style.display = 'none';
}
function hideMainBottomNavbar () {
    main_bottom_navbar.style.display = 'none';
}


/** SHARE-A-RIDE */
function createTrip() {
    var user = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));

    var target_location = driver_target_location.value ? driver_target_location.value : '';
    var available_seats = driver_available_seats.value ? driver_available_seats.value : 0;
    var departure_datetime = moment(driver_departure_date.value + ' ' + driver_departure_time.value).format("YYYY-MM-DDTHH:mm") + ':00.000Z';
    var contact_no = driver_contact_no.value ? '63' + driver_contact_no.value.replace(/(\s)/gi, '') : '#';
    var payload = {
        "email": user.email,
        "fullname": user.displayName,
        "department": user.jobTitle ? user.jobTitle : 'Cebu Pacifir Air, Inc.',
        "phone": contact_no,
        "origin": target_location,
        "seats": available_seats,
        "tripType": 0,
        "riders": [],
        "departTime": departure_datetime
    };
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(CREATE_TRIP_API_ENDPOINT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Trip has been created',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            localStorage.setItem(CREATED_TRIP_KEY, data['0']);
            window.location.href = '/';
        })
        .catch(function (err) {
            console.error(err);
            alert('ERROR: ' + err);
            reloadCarpoolPage();
        });
}
function completeTrip(_id, status) {
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

    fetch(COMPLETE_TRIP_API_ENDPOINT + '/' + _id, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            if (data) {
                
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Trip has been completed',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                });
    
                localStorage.removeItem(CREATED_TRIP_KEY);
                window.location.href = '/';
            }
        })
        .catch(function (err) {
            console.error(err);
            alert('ERROR: ' + err);
            window.location.href = '/';
        });
}


/** FIND CARPOOL */
function hideMoreCarpoolButtonsContainer () {
    more_carpool_buttons.style.display = 'none';
}
function hideDriverPoolResultsContainer () {
    driver_pool_results_container.style.display = 'none';
}
function hideTripCompleted () {
    trip_completed_container.style.display = 'none';
}
function loadCarpoolDriversList() {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var pointA = is_to_drop_switch.checked ? search_drop_off_point.value : search_pick_up_point.value;
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pointA: pointA, tripType: 0 })
    };

    fetch(MATCH_TRIP_DYNAMIC_API_ENDPOINT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            if (data.length > 0) {
                driver_pool_results_container.innerHTML = '<div class=\"container\">' + '<div class=\"list-group\">' + data.filter(function (driver) {
                    return driver.email !== email;
                }).map(function (driver, i) {
                    var rider_fullname = driver.fullname ? driver.fullname : 'Unknown';
                    var is_pool_available = driver.seats > 0 ? 'Available' : 'Unavailable';
                    var is_pool_available_color = driver.seats > 0 ? 'bg-primary' : '.bg-secondary';
                    var rider_location = driver.origin.split(', ');
                    var location = rider_location[rider_location.length - 1];
    
                    return '<button type=\"button\" class=\"list-group-item list-group-item-action carpool-driver-to-choose-button\" id=\"' + i + '\" data-bs-toggle="offcanvas" data-bs-target="#show_confirm_carpool_rider" aria-controls=\"show_confirm_carpool_rider\">'
                                    + '<div class=\"row\">'
                                        + '<div class=\"col-4 col-sm-3 d-flex justify-content-center\" style=\"width: 75px; \">'
                                            + '<div class=\"avatar-container\">'
                                                + '<img class=\"avatar\" src=\"../images/sample/no-avatar.png\" />'
                                            + '</div>'
                                        + '</div>'
                                        + '<div class=\"col d-flex flex-column\">'
                                            + '<div class=\"row\">'
                                                + '<div class=\"col d-flex justify-content-between align-items-center\">'
                                                    + '<span class=\"h6 mb-0\">' + rider_fullname + '</span>'
                                                    + '<span class=\"badge rounded-pill ' + is_pool_available_color + ' mt-0\" style=\"margin-right: 5px;\">' + is_pool_available + ' </span>'
                                                + '</div>'
                                            + '</div>'
                                            + '<span class=\"text-muted\">' + location + '</span>'
                                        + '</div>'
                                    + '</div>'
                                + '</button>';
                }).join('') + '</div>' + '</div>';
        
                document.querySelectorAll('.carpool-driver-to-choose-button').forEach(function (btn) {
                    btn.addEventListener('click', function (e) {
                        var id = btn.id;
                        var rider_location = data[id].origin.split(', ');
                        var location = rider_location[rider_location.length - 1];
                        var pick_up_point = is_to_drop_switch.checked ? 'Cebu Pacific AOC' : data[id].origin;
                        var drop_off_point = is_to_drop_switch.checked ? data[id].origin : 'Cebu Pacific AOC';
                        var is_pool_available = data[id].seats > 0 ? 'Available' : 'Unavailable';
                        var rider_passengers = data[id].riders ? data[id].riders : null;
                        var rider_passengers_count = rider_passengers ? rider_passengers.length : 0;
                        var seats_available = data[id].seats ? data[id].seats - rider_passengers_count : 0;
                        var rider_phone_number = data[id].phone ? data[id].phone : '#';
                        var rider_teams_email = data[id].email ? data[id].email : '#';
                        var rider_department = data[id].department ? data[id].department : 'Cebu Pacific Air Inc.';
                        var rider_fullname = data[id].fullname ? data[id].fullname : 'Unknown';
                        var rider_depart_time = data[id].departTime ? moment(data[id].departTime).format('h:mm a') : 'Unknown';
                        var rider_passengers = data[id].riders ? data[id].riders : null;
                        var offcanvas_rider_is_available = document.querySelector('.offcanvas_rider_is_available')
                        var offcanvas_phone_number = document.querySelector('.offcanvas_phone_number');
                        var offcanvas_rider_passengers_list = document.querySelector('.offcanvas_rider_passengers_list');

                        document.querySelector('.offcanvas_rider_fullname').innerHTML = rider_fullname;
                        offcanvas_rider_is_available.innerHTML = is_pool_available;
                        document.querySelector('.offcanvas_rider_location').innerHTML = location;
                        document.querySelector('.offcanvas_rider_department').innerHTML = rider_department;
                        document.querySelector('.offcanvas_seats_count').innerHTML = seats_available + ' seats available';
                        document.querySelector('.offcanvas_departure_time').innerHTML = rider_depart_time;
                        document.querySelector('.offcanvas_pick_up_point').innerHTML = pick_up_point;
                        document.querySelector('.offcanvas_drop_off_point').innerHTML = drop_off_point;
                        document.querySelector('.offcanvas_teams_email a').href = 'https://teams.microsoft.com/l/chat/0/0?users=' + rider_teams_email;
                        offcanvas_phone_number.href = 'tel:' + rider_phone_number;
                        offcanvas_phone_number.innerHTML = rider_phone_number;

                        if (offcanvas_rider_is_available.classList.contains('bg-primary') && seats_available < 1) {
                            offcanvas_rider_is_available.classList.remove('bg-primary');
                            offcanvas_rider_is_available.classList.add('bg-secondary');
                        } else {
                            offcanvas_rider_is_available.classList.add('bg-primary');
                            offcanvas_rider_is_available.classList.remove('bg-secondary');
                        }

                        if (rider_passengers_count > 1) {
                            var blocks = '';

                            for (var i = 0; i < seats_available; i++) {
                                blocks += '<div class=\"col\">'
                                                                                + '<div class=\"avatar-container\">'
                                                                                +     '<img class=\"avata\" src=\"../images/sample/no-avatar.png\" />'
                                                                                + '</div>'
                                                                                + '<p class=\"text-muted avatar-name avatar-name-unavailable\">Empty Seat</p>'
                                                                            + '</div>';
                            }

                            offcanvas_rider_passengers_list.innerHTML = rider_passengers.map(function (passenger) {
                                return '<div class=\"col\">'
                                                + '<div class=\"avatar-container\">'
                                                +     '<img class=\"avata\" src=\"../images/sample/no-avatar.png\" />'
                                                + '</div>'
                                                + '<p class=\"text-muted avatar-name\">' + passenger + '</p>'
                                            + '</div>';
                                }).join('') + blocks;
                        } else {
                            var blocks = '';

                            for (var i = 0; i < seats_available; i++) {
                                blocks += '<div class=\"col\">'
                                                + '<div class=\"avatar-container\">'
                                                +     '<img class=\"avata\" src=\"../images/sample/no-avatar.png\" />'
                                                + '</div>'
                                                + '<p class=\"text-muted avatar-name avatar-name-unavailable\">Empty Seat</p>'
                                            + '</div>';
                            }

                            offcanvas_rider_passengers_list.innerHTML = blocks;
                        }

                        join_pool_rider_button.addEventListener('click', onJoinPoolRider(data[id]));
                    });
                });
            } else {
                driver_pool_results_container.innerHTML = NO_RESULTS_FOUND;
            }
        })
        .catch(function (err) {
            console.error(err);
            alert('ERROR: ' + err);
        });


}
function loadTripCompletedScreen() {
    showTripCompleted();
}
function loadCarpoolOnTripScreen(rider) {
    var origin = rider.origin.split(', ');
    var tripID = rider._id;
    var passenger = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY));
    var payload = {
        "tripID": tripID,
        "email": passenger.email,
        "ridername": passenger.displayName,
        "driver": rider.email,
        "drivername": rider.fullname,
        "destination": rider.origin,
        "booktype": 0
    }
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    fetch(BOOK_RIDE_API_ENDPOINT, options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.error(err);
            alert('ERROR: ' + err);
        });

    carpool_on_trip_container.innerHTML = '<div style="height: 100%;">'
                                            + '<p class=\"display-6 absolute-center text-center\" style=\"top: 40%; width: 100%;\">Booking request sent</p>'
                                            + '</div>'
                                                + '<div class="on-trip-container container-fluid">'
                                                    + '<div class=\"container d-flex flex-column\">'
                                                            + '<div class=\"row driver-info-header\">'
                                                                + '<div class=\"col-4 col-sm-3 d-flex justify-content-center\" style=\"width: 75px; \">'
                                                                    + '<div class=\"avatar-container\">'
                                                                        + '<img class=\"avatar\" src=\"../images/sample/no-avatar.png\" />'
                                                                    + '</div>'
                                                                + '</div>'
                                                                + '<div class=\"col d-flex flex-column\">'
                                                                    + '<div class=\"row\">'
                                                                        + '<div class=\"col d-flex justify-content-between\">'
                                                                            + '<span class=\"h6 mb-0\">' + rider.fullname + '</span>'
                                                                        + '</div>'
                                                                    + '</div>'
                                                                    + '<span class=\"text-muted\">' + origin[origin.length - 1] + '</span>'
                                                                + '</div>'
                                                            + '</div>'
                                                            + '<div class=\"row my-3 mx-auto option-buttons\">'
                                                                + '<div class=\"col-2 d-flex justify-content-center\">'
                                                                        + '<a type=\"button\" target=\"_blank\" href=\"https://teams.microsoft.com/l/chat/0/0?users=' + rider.email + '\" class=\"btn btn-primary\" style=\"border-radius: 50%; background-color: transparent;\">'
                                                                            + '<i class=\"fa-solid fa-message\" style=\"color: #0D6EFD;\"></i>'
                                                                        + '</a>'
                                                                + '</div>'
                                                                + '<div class=\"col d-flex justify-content-center\">'
                                                                    + '<a type=\"button\" href=\"tel:+' + rider.phone + '\" class=\"btn btn-primary\" id=\"call_rider_button\" style=\"border-radius: 24px; width: 100%;\">Call Driver</a>'
                                                                + '</div>'
                                                        + '</div>'
                                                        + '</div>'
                                                + '</div>';
}


function loadCarpoolMainPage() {
    showMainBottomNavbar();
    onIsToDropSwitch();
    showFindCarpoolNavigateContainer();
    showShareRideNavigateContainer();
    showMainTopNavbar();
    showMoreCarpoolButtonsContainer();
    is_to_drop_switch.checked = false;
    is_to_drop_switch_rider.checked = false;
    carpool_main_page.style.display = 'block';
    error_page.style.display = 'none';
}

function reloadCarpoolPage () {
    var email = JSON.parse(localStorage.getItem(USER_LOGIN_DATA_KEY)).email;
    var created_trip_key = localStorage.getItem(CREATED_TRIP_KEY);

    loadCarpoolMainPage();

    if (created_trip_key) {
        carpool_ride_list_container.style.display = 'none';
        showOnTripDriverContainer();
        showMainBottomNavbar();
        showMainTopNavbar();
        hideMoreCarpoolButtonsContainer();

        fetch('https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/book/driver/' + email)
            .then(function (result) {
                return result.json();
            })
            .then(function (data) {
                if (data && data.length > 0) {
                    var driver = data.filter(function(trip) {
                        return trip.tripID === created_trip_key;
                    });
                    
                    if (driver.length > 0) {
                        document.getElementById('complete_driver_trip_button').disabled = false;
                        document.querySelector('.no-results').style.display = 'none';
                        document.querySelector('.offcanvas_driver_departure_time').innerHTML = moment(driver[0].updatedAt).utc().format('MMMM D YYYY  h:mm a');
                        document.querySelector('.offcanvas_driver_target_location').innerHTML = driver[0].destination;
                    } else {
                        document.getElementById('complete_driver_trip_button').disabled = true;
                        document.querySelector('.no-results').style.display = 'block';
                        document.querySelector('.offcanvas_driver_departure_time').innerHTML = '-';
                        document.querySelector('.offcanvas_driver_target_location').innerHTML = '-';
                    }
    
                    document.getElementById('complete_driver_trip_button').addEventListener('click', onCompleteTrip(driver[0]._id));
                }
            })
            .catch(function (err) {
                console.error(err);
                alert('ERROR: ' + err);
            });
    } else {
        
    }
}


/** FIND CARPOOL */
function onCarpoolRidelist () {
    if (share_a_ride_button.classList.contains('active-tab-button')) {
        share_a_ride_button.classList.remove('active-tab-button');
    }

    is_to_drop_switch_rider.checked = false;
    carpool_ride_list_button.classList.add('active-tab-button');
    showCarpoolRideListContainer();
    showFindCarpoolNavigateContainer();
}
function onIsToDropSwitch () {
    search_drop_off_point.value = '';
    search_pick_up_point.value = '';

    if (is_to_drop_switch.checked) {
        search_drop_off_point.style.display = 'block';
        search_pick_up_point.style.display = 'none';
    } else {
        search_pick_up_point.style.display = 'block';
        search_drop_off_point.style.display = 'none';
    }
}
function onFindCarpoolRide () {
    driver_pool_results_container.innerHTML = PAGE_LOAD_SPINNER;
    showDriverPoolListContainer();
    showSecondaryTopNavbar();
    hideMoreCarpoolButtonsContainer();
    hideMainBottomNavbar();
    delay(loadCarpoolDriversList, 1500);
}
function onJoinPoolRider (rider) {
    return function () {
        hideDriverPoolResultsContainer();
        showCarpoolOnTripContainer();
        showMainBottomNavbar();
        onIsToDropSwitch();
        showMainTopNavbar();
    
        carpool_on_trip_container.innerHTML = PAGE_LOAD_SPINNER;
    
        delay(loadCarpoolOnTripScreen(rider), 1500);
        // delay(loadTripCompletedScreen, 10000); // if trip was completed scenario
    }
}
function onTripCompleted () {
    hideTripCompleted();
    delay(reloadCarpoolPage, 500);
}


/** SHARE-A-RIDE */
function onIsToDropSwitchRider () {
    search_drop_off_point_rider.value = '';
    search_pick_up_point_rider.value = '';

    if (is_to_drop_switch_rider.checked) {
        search_drop_off_point_rider.style.display = 'block';
        search_pick_up_point_rider.style.display = 'none';
    } else {
        search_pick_up_point_rider.style.display = 'block';
        search_drop_off_point_rider.style.display = 'none';
    }
}
function onShareCarpoolRide () {
    if (carpool_ride_list_button.classList.contains('active-tab-button')) {
        carpool_ride_list_button.classList.remove('active-tab-button');
    }

    share_a_ride_button.classList.add('active-tab-button');
    is_to_drop_switch.checked = false;
    showShareARideContainer();
    showShareRideNavigateContainer();
    onIsToDropSwitchRider();
}
function onMoreShareRide() {
    showSecondaryTopNavbar();
    hideMoreCarpoolButtonsContainer();
    hideMainBottomNavbar();
    showCreateTripContainer();
    driver_target_location.value = '';
    driver_available_seats.value = '';
    driver_departure_date.value = '';
    driver_departure_time.value = '';
    driver_contact_no.value = '';

    var target_location = search_pick_up_point_rider.value ? search_pick_up_point_rider.value : search_drop_off_point_rider.value;

    new Cleave(driver_contact_no, {
        numericOnly: true,
        blocks: [0, 2, 3, 4],
        delimiters: ['9', ' ', ' ']
    });

    new Cleave(driver_departure_date, {
        date: true,
        delimiter: '-',
        datePattern: ['Y', 'm', 'd']
    });

    new Cleave(driver_departure_time, {
        time: true,
        timePattern: ['h', 'm']
    });

    driver_target_location.value = target_location;
}
function onCreateTrip() {
    Swal.fire({
        title: 'Create Trip',
        text: 'Are you sure you want to continue?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            createTrip();
        }
    });
}
function onCompleteTrip(_id) {
    return function () {
        Swal.fire({
            title: 'Complete Trip',
            text: 'Are you sure you want to continue?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                completeTrip(_id, 3);
            }
        });
    }
}


back_to_previous_page_button.addEventListener('click', reloadCarpoolPage);


/** FIND CARPOOL */
carpool_ride_list_button.addEventListener('click', onCarpoolRidelist);
is_to_drop_switch.addEventListener('change', onIsToDropSwitch);
find_pool_rider_button.addEventListener('click', onFindCarpoolRide);
trip_completed_button.addEventListener('click', onTripCompleted);


/** SHARE-A-RIDE */
share_a_ride_button.addEventListener('click', onShareCarpoolRide);
is_to_drop_switch_rider.addEventListener('click', onIsToDropSwitchRider);
share_pool_ride_button_rider.addEventListener('click', onMoreShareRide);
create_trip_button.addEventListener('click', onCreateTrip);


document.addEventListener('DOMContentLoaded', function () {
    checkCurrentSession();
});