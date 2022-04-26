"use strict";
function showAlertStatus(title, text, status) {
    Swal.fire({
        title: title,
        text: text,
        icon: status,
        allowEscapeKey: true,
        showConfirmButton: false,
        timer: 2000
    });
}
function showUserInfo(data) {
    Swal.fire({
        title: 'Passenger\'s Info',
        icon: 'info',
        html: '<b>Emnployee ID: </b>' + data.employee_id + '<br/>' +
            '<b>Name: </b>' + data.name + '<br/>' +
            '<b>Department: </b>' + capitalizeMultipleStrings(data.department) + '<br/>' +
            '<b>Position: </b>' + capitalizeMultipleStrings(data.job_role) + '<br/>' +
            '<b>Point of Origin: </b>' + capitalizeMultipleStrings(data.point_of_origin) + '<br/>' +
            '<b>Onsite Schedule: </b>' + capitalizeString(data.onsite_schedule) + '<br/>',
        showCloseButton: false,
        focusConfirm: false,
        confirmButtonText: 'Okay',
    });
}
