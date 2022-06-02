var main_top_navbar = document.getElementById('main_top_navbar');
var main_bottom_navbar = document.getElementById('main_bottom_navbar');
var secondary_top_navbar = document.getElementById('secondary_top_navbar');

function showMainBottomNavbar () {
    main_bottom_navbar.style.display = 'block';
}
function showMainTopNavbar() {
    main_top_navbar.style.display = 'flex';
    secondary_top_navbar.style.display = 'none';
}
function showSecondaryTopNavbar() {
    main_top_navbar.style.display = 'none';
    secondary_top_navbar.style.display = 'flex';
}

function hideMainBottomNavbar () {
    main_bottom_navbar.style.display = 'none';
}