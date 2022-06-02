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

function showSuccessAlertWithConfirmButton(callback, title, text, confirmButtonText) {
    Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        confirmButtonText: confirmButtonText,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

function showErrorAlert(title, text) {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: title,
        text: text,
        showConfirmButton: true,
        allowOutsideClick: false
    });
}

function showErrorAlertWithConfirmButton(callback, title, text, confirmButtonText) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        confirmButtonText: confirmButtonText,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

function showInfoAlertWithConfirmButton(callback, title, text, confirmButtonText) {
    Swal.fire({
        icon: 'info',
        title: title,
        text: text,
        confirmButtonText: confirmButtonText,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

function showQuestionAlertWithButtons(callback, title, text, confirmButtonText, cancelButtonText) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}