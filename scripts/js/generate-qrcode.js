const userQRCode = document.getElementById('user_qr_code');

/** PAGE LOAD INITIALIZATION */
document.addEventListener('DOMContentLoaded', function() {
    var qrcode = new QRCode(userQRCode, {
        width: 200,
        height: 200
    });
    var sampleData = {
                        employee_id: "00654123",
                        name: "John Smith",
                        department: "Information Technology",
                        point_of_origin: "Pasay City",
                        onsite_schedule: "a",
                        onsite_days: "tuesday,wednesday",
                        email: "john.smith@email.com",
                    };
    qrcode.makeCode(JSON.stringify(sampleData, null, 2));
});