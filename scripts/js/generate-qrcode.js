"use strict";
function generateUserQRCode(data) {
    var qrcode = new QRCode(userQRCode, {
        width: 250,
        height: 250
    });
    var output = data.access_role === 'driver' ? {
        "employee_id": data.employee_id,
        "vehicle_id": data.vehicle_id,
        "email": data.email,
        "access_role": data.access_role
    } : {
        "employee_id": data.employee_id,
        "email": data.email,
        "access_role": data.access_role
    };
    qrcode.makeCode(JSON.stringify(output, null, 2));
    var vehicleDetails = data.access_role === 'driver' ? '\nVehicle ID: ' + data.vehicle_id + '\nPlateNumber: ' + data.vehicle_plate_number : '';
    userQRCode.title = 'Employee ID: ' + data.employee_id + vehicleDetails + '\nName: ' + data.name + '\nEmail: ' + data.email + '\nDepartment: ' + data.department + '\nPosition: ' + data.job_role;
    userDetails.innerHTML = data.access_role === 'driver' ? 'Ask rider to scan QR code to use shuttle service' : 'Ask driver to scan your QR-Code for employee information';
    userQRCodeContainer.style.display = "block";
}
function clearUserQRCode() {
    userQRCode.innerHTML = '';
    userDetails.innerHTML = '';
    userQRCodeContainer.style.display = "none";
}
