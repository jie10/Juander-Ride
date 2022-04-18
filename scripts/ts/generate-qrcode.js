

function generateUserQRCode (data) {
    var qrcode = new QRCode(userQRCode, {
        width: 200,
        height: 200
    });

    qrcode.makeCode('Employee ID: ' + data.employee_id + '\nName: ' + data.name + '\nEmail: ' + data.email + '\nDepartment: ' + data.department + '\nPosition: ' + data.job_role);
}