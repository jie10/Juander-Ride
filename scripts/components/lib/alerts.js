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

function showInfoAlertWithConfirmAndCloseButtonsHTML(callback, title, html, confirmButtonText) {
    Swal.fire({
        icon: 'info',
        title: title,
        html: html,
        showCloseButton: true,
        confirmButtonText: confirmButtonText,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

function showInfoAlertWithConfirmButtonHTML(callback, title, html, confirmButtonText) {
    Swal.fire({
        icon: 'info',
        html: html,
        title: title,
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
        cancelButtonText: cancelButtonText,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

function showQuestionAlertWithDenyAndCloseButton(confirmCallback, cancelCallback, title, text, confirmButtonText, denyButtonText) {
    Swal.fire({
        title: title,
        text: text, 
        showDenyButton: true,
        showCloseButton: true,
        confirmButtonText: confirmButtonText,
        denyButtonText: denyButtonText,
        allowOutsideClick: false
      }).then((result) => {
          console.log(result)
        if (result.isConfirmed) {
            confirmCallback();
        } else if (result.isDenied) {
            cancelCallback();
        }
      });
}

function showInputTextFieldAlertWithConfirmAndCancelButton (callback, inputPattern, title, inputPlaceholder, confirmButtonText, errorPatternMessageText) {
    Swal.fire({
        title: title,
        input: 'text',
        inputPlaceholder: inputPlaceholder,
        confirmButtonText: confirmButtonText,
        showCancelButton: true,
        allowOutsideClick: false,
        inputAttributes: {
            maxlength: 6,
            autocapitalize: 'off',
            autocorrect: 'off'
        },
        inputValidator: (value) => {
            if (inputPattern && inputPattern.test(value) === false) {
                return errorPatternMessageText;
            } else if (!value) {
                return 'Field cannot be empty';
            }
        }
      }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
      });
}

function showSuccessToastNotification(title,) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
      
    Toast.fire({
        icon: 'success',
        title: title
    });
}