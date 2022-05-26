function login() {
    var email = document.getElementById("email");

    if (email == "techinnov@cebupacificair.com") {
        window.location.href = "newhomepage.html";
    } else {
        var errMsg = document.getElementById('errMsg');
        errMsg.style.display = "block";
        errMsg.style.color = "red";
    }
}

function loginAsGuest() {
    window.location.href = "guestpage.html";
}