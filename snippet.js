function login(email) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    };

    fetch('https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/login', options)
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
            // do anything here
        })
        .catch(function (err) {
            console.error(err);
            alert('ERROR: ' + err);
        });
}