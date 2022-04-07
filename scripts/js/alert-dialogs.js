function showAlertStatus (title, text, status) {
    Swal.fire({
        title: title,
        text: text,
        icon: status,
        allowEscapeKey: true,
        showConfirmButton: false,
        timer: 2000
    });
}