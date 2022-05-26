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
function showCarpoolRideListContainer() {
    carpool_ride_list_container.style.display = 'block';
    share_a_ride_container.style.display = 'none';
}
function showFindCarpoolNavigateContainer() {
    find_carpool_navigate_container.style.display = "block";
    driver_pool_results_container.style.display = "none";
}
function showDriverPoolListContainer() {
    find_carpool_navigate_container.style.display = "none";
    driver_pool_results_container.style.display = "block";
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
function showShareARideContainer() {
    carpool_ride_list_container.style.display = 'none';
    share_a_ride_container.style.display = 'block';
}
function showShareRideNavigateContainer() {
    share_ride_navigate_container.style.display = "block";
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
    if (carpools.length > 0) {
        driver_pool_results_container.innerHTML = '<div class=\"container\">' + '<div class=\"list-group\">' + carpools.map(function (driver) {
            var user = users.filter(function (user) {
                return user.employee_id === driver.employee_id;
            })[0];
            return user ? '<button type=\"button\" class=\"list-group-item list-group-item-action carpool-driver-to-choose-button\" id=\"' + driver._id + '\" data-bs-toggle="offcanvas" data-bs-target="#show_confirm_carpool_rider" aria-controls=\"show_confirm_carpool_rider\">'
                            + '<div class=\"row\">'
                                + '<div class=\"col-4 col-sm-3 d-flex justify-content-center\" style=\"width: 75px; \">'
                                    + '<div class=\"avatar-container\">'
                                        + '<img class=\"avatar\" src=\"../images/sample/avatar_3.jpg\" />'
                                    + '</div>'
                                + '</div>'
                                + '<div class=\"col d-flex flex-column\">'
                                    + '<div class=\"row\">'
                                        + '<div class=\"col d-flex justify-content-between\">'
                                            + '<span class=\"h6 mb-0\">' + user.name + '</span>'
                                            + '<span class=\"badge rounded-pill bg-primary mt-0\" style=\"margin-right: 5px;\">' + user.job_role + ' </span>'
                                        + '</div>'
                                    + '</div>'
                                    + '<span class=\"text-muted\">Makati</span>'
                                + '</div>'
                            + '</div>'
                            + '</button>' : '';
        }).join('') + '</div>' + '</div>';

        document.querySelectorAll('.carpool-driver-to-choose-button').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                // TODO - Add API action here
            })
        });
    } else {
        driver_pool_results_container.innerHTML = NO_RESULTS_FOUND;
    }
}
function loadTripCompletedScreen() {
    showTripCompleted();
}
function loadCarpoolOnTripScreen() {
    carpool_on_trip_container.innerHTML = '<div style="height: 100%;">'
                                            + '<p class=\"display-6 absolute-center text-center\" style=\"top: 40%; width: 100%;\">We\'re on our way!</p>'
                                            + '</div>'
                                                + '<div class="on-trip-container container-fluid">'
                                                    + '<div class=\"container d-flex flex-column\">'
                                                            + '<div class=\"row driver-info-header\">'
                                                                + '<div class=\"col-4 col-sm-3 d-flex justify-content-center\" style=\"width: 75px; \">'
                                                                    + '<div class=\"avatar-container\">'
                                                                        + '<img class=\"avatar\" src=\"../images/sample/avatar_3.jpg\" />'
                                                                    + '</div>'
                                                                + '</div>'
                                                                + '<div class=\"col d-flex flex-column\">'
                                                                    + '<div class=\"row\">'
                                                                        + '<div class=\"col d-flex justify-content-between\">'
                                                                            + '<span class=\"h6 mb-0\">Bob Santos</span>'
                                                                            + '<span class=\"badge rounded-pill bg-primary mt-0\" style=\"margin-right: 5px;\">Admin</span>'
                                                                        + '</div>'
                                                                    + '</div>'
                                                                    + '<span class=\"text-muted\">Makati</span>'
                                                                + '</div>'
                                                            + '</div>'
                                                            + '<div class=\"row my-3 mx-auto option-buttons\">'
                                                                + '<div class=\"col-2 d-flex justify-content-center\">'
                                                                        + '<a type=\"button\" target=\"_blank\" href=\"https://teams.microsoft.com/l/chat/0/0?users=jemimahberyl.sai@cebupacificair.com\" class=\"btn btn-primary\" style=\"border-radius: 50%; background-color: transparent;\">'
                                                                            + '<i class=\"fa-solid fa-message\" style=\"color: #0D6EFD;\"></i>'
                                                                        + '</a>'
                                                                + '</div>'
                                                                + '<div class=\"col d-flex justify-content-center\">'
                                                                    + '<a type=\"button\" href=\"tel:+6396170961709\" class=\"btn btn-primary\" id=\"call_rider_button\" style=\"border-radius: 24px; width: 100%;\">Call Rider</a>'
                                                                + '</div>'
                                                        + '</div>'
                                                        + '</div>'
                                                + '</div>';
}
function loadCarpoolMainPage() {
    showMainBottomNavbar();
    onIsToDropSwitch();
    showFindCarpoolNavigateContainer();
    showMainTopNavbar();
    showMoreCarpoolButtonsContainer();
    is_to_drop_switch.checked = false;
    is_to_drop_switch_rider.checked = false;
    carpool_main_page.style.display = 'block';
    error_page.style.display = 'none';
}

function reloadCarpoolPage () {
    loadCarpoolMainPage();
}

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
function onJoinPoolRider () {
    hideDriverPoolResultsContainer();
    showCarpoolOnTripContainer();
    showMainBottomNavbar();
    onIsToDropSwitch();
    showMainTopNavbar();

    carpool_on_trip_container.innerHTML = PAGE_LOAD_SPINNER;

    // delay(loadCarpoolOnTripScreen, 1500);
    delay(loadCarpoolOnTripScreen, 1500);
    delay(loadTripCompletedScreen, 10000); // if trip was completed scenario
}
function onTripCompleted () {
    hideTripCompleted();
    delay(reloadCarpoolPage, 500);
}
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

back_to_previous_page_button.addEventListener('click', reloadCarpoolPage);
carpool_ride_list_button.addEventListener('click', onCarpoolRidelist);
is_to_drop_switch.addEventListener('change', onIsToDropSwitch);
find_pool_rider_button.addEventListener('click', onFindCarpoolRide);
join_pool_rider_button.addEventListener('click', onJoinPoolRider);
trip_completed_button.addEventListener('click', onTripCompleted);

share_a_ride_button.addEventListener('click', onShareCarpoolRide);
is_to_drop_switch_rider.addEventListener('click', onIsToDropSwitchRider);

document.addEventListener('DOMContentLoaded', function () {
    reloadCarpoolPage(); 
});