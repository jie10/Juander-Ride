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

function showScanAlertStatus (title, text, status) {
    Swal.fire({
        title: title,
        text: text,
        icon: status,
        showConfirmButton: true
    })
    .then(function (result) {
        if (result.isConfirmed) {
            location.reload();
        }
    });
}

function showUserInfo (data) {
    Swal.fire({
        title: 'Passenger\'s Info',
        icon: 'info',
        showConfirmButton: true,
        html:
        '<b>Emnployee ID: </b>' + data.employee_id + '<br/>' +
        '<b>Name: </b>' + data.name + '<br/>' +
        '<b>Department: </b>' + capitalizeMultipleStrings(data.department) + '<br/>' +
        '<b>Position: </b>' + capitalizeMultipleStrings(data.job_role) + '<br/>' +
        '<b>Point of Origin: </b>' + capitalizeMultipleStrings(data.point_of_origin) + '<br/>' +
        '<b>Onsite Schedule: </b>' + capitalizeString(data.onsite_schedule) + '<br/>',
        showCloseButton: false,
        focusConfirm: false,
        confirmButtonText:
        'Okay',
    }).then(function (result) {
        if (result.isConfirmed) {
            location.reload();
        }
    });
}