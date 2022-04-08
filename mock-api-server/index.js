const express = require('express');
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');
const session = require('express-session');
const { uuid } = require('uuidv4');
const cors = require('cors');
const req = require('express/lib/request');
const res = require('express/lib/response');

const PORT = process.env.PORT || 8000;
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const login = (req, email, password) => {
    return new Promise((resolve, reject) => {
        try {
            if (email && password) {
                const user = users && users.length > 0 ? users.filter(user => {
                    return user.account.email === email && user.account.password === password;
                }).map(user => ({
                    "email": user.account.email
                })) : null;

                if (user) {
                    if (user.length > 0) {
                        req.session.user = email;
                        resolve({ "status": 200, "title": "Login Successful", "message": "Email and password are correct", "data": user[0] });
                    } else {
                        resolve({ "status": 400, "title": "Login Failed", "message": "Email or password is incorrect. Please try again" });
                    }
                } else {
                    resolve({
                        "status": 404,
                        "title": "User not found",
                        "message": "Please login and try again."
                    });
                }
            } else {
                resolve({ "status": 400, "title": "Incomplete required fields", "message": "Please make sure all required fields are filled out before submitting form" })
            }

        } catch(err) {
            reject(err);
        }
    });
}

const register = (req, email, password) => {
    return new Promise((resolve, reject) => {
        try {
            if (email && password) {
                const user = users && users.length > 0 ? users.filter(user => {
                    return user.account.email === email && user.account.password === password;
                }).map(user => ({
                    "email": user.account.email
                }))  : null;

                if (user && user.length > 0) {
                    resolve({ "status": 409, "title": "User already exists", "message": "Please try another email to register" });
                } else {
                    users.push({
                        "_id": uuid(),
                        "employee_id": "",
                        "name": "",
                        "department": "",
                        "job_role": "",
                        "profile": {
                            "point_of_origin": "",
                            "onsite_schedule": "",
                            "onsite_days": ""
                        },
                        "account": {
                            "email": email,
                            "password": password,
                            "access_role": "rider"
                        }
                    });
                    req.session.user = email;
                    resolve({ "status": 201, "title": "Account created successfully", "message": "User registration has been completed", "data": user[0] });
                }
            } else {
                resolve({ "status": 400, "title": "Incomplete required fields", "message": "Please make sure all required fields are filled out before submitting form" })
            }

        } catch(err) {
            reject(err);
        }
    });
}

const logout = (req) => {
    return new Promise((resolve, reject) => {
        try {
            if (req.session.user) {
                req.session.destroy();
                resolve({ "status": 200, "title": "Logout Successful", "message": "Session has ended for current user" });
            } else {
                resolve({ "status": 400, "title": "User has no session yet", "message": "Please login first and try again" })
            }

        } catch(err) {
            reject(err);
        }
    });
}

const viewUser = (email) => {
    return new Promise((resolve, reject) => {
        try {
            if (email) {
                const user = users && users.length > 0 ? users.filter(user => {
                    return user.account.email === email;
                }) : null;
        
                const result = user && user.length > 0 ? { "status": 200, "title": "User found", "message": "User exists from our database", "data": user[0] } : {
                    "status": 404,
                    "title": "User not found",
                    "message": "Please login and try again."
                };
        
                resolve(result);
            } else {
                resolve({ "status": 400, "title": "Incomplete request", "message": "Please make sure you indicate user email to retrieve their data" })
            }

        } catch(err) {
            reject(err);
        }
    });
}

const updateUser = (body) => {
    return new Promise((resolve, reject) => {
        try {
            if (body) {
                const user = users && users.length > 0 ? users.filter(user => {
                    return user.account.email === body.email;
                }) : null;

                users.map(user => {
                    if (user.account.email === body.email) {
                        user.account.email = body.email ? body.email : user.account.email;
                        user.account.password = body.password ? body.password : user.account.password;
                        user.name = body.name ? body.name: user.name;
                        user.department = body.department ? body.department : user.department;
                        user.profile.point_of_origin = body.point_of_origin ? body.point_of_origin : user.profile.point_of_origin;
                        user.profile.onsite_schedule = body.onsite_schedule ? body.onsite_schedule : user.profile.onsite_schedule;
                        user.profile.onsite_days = body.onsite_days ? body.onsite_days : user.profile.onsite_days;
                    }
                    return user;
                });

                if (user && user.length > 0 ) {
                    resolve({
                        "status": 200,
                        "title": "Update Successful",
                        "message": "User profile has been changed"
                    });
                } else {
                    resolve({
                        "status": 404,
                        "title": "User not found",
                        "message": "Please login and try again."
                    });
                }
            }
        } catch(err) {
            reject(err);
        }
    });
}

const scanUserQRCode = (email) => {
    return new Promise((resolve, reject) => {
        try {
            if (email) {
                const user = users && users.length > 0 ? users.filter(user => {
                    return user.account.email === email;
                }).map(user => ({
                    "employee_id": user.employee_id,
                    "name": user.name,
                    "department": user.department,
                    "job_role": user.job_role,
                    "point_of_origin": user.profile.point_of_origin,
                    "onsite_schedule": user.profile.onsite_schedule,
                    "onsite_days": user.profile.onsite_days
                })) : null;

                const result = user && user.length > 0 ? { "status": 200, "title": "User found", "message": "User exists from our database", "data": user[0] } : {
                    "status": 404,
                    "title": "User not found",
                    "message": "Please login and try again."
                };
        
                resolve(result);
            } else {
                resolve({ "status": 400, "title": "Incomplete request", "message": "Please make sure you indicate user email to retrieve their data" })
            }

        } catch(err) {
            reject(err);
        }
    });
}

app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    login(req, email, password)
        .then(result => res.status(result.status).json(result))
        .catch(err => {
            res.status(500).json(err);
            console.error(err);
        });
});

app.post('/register', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    register(req, email, password)
        .then(result => res.status(result.status).json(result))
        .catch(err => {
            res.status(500).json(err);
            console.error(err);
        });
});

app.delete('/logout', (req, res) => {
    logout(req)
        .then(result => res.status(result.status).json(result))
        .catch(err => {
            res.status(500).json(err);
            console.error(err);
        });
});

app.get('/user/scan', (req, res) => {
    scanUserQRCode(req.body.email)
        .then(result => res.status(result.status).json(result))
        .catch(err => {
            res.status(500).json(err);
            console.error(err);
        });
});

app.get('/user/view', (req, res) => {
    viewUser(req.body.email)
        .then(result => res.status(result.status).json(result))
        .catch(err => {
            res.status(500).json(err);
            console.error(err);
        });
});

app.patch('/user/update', (req, res) => {
    updateUser(req.body)
        .then(result => res.status(result.status).json(result))
        .catch(err => {
            res.status(500).json(err);
            console.error(err);
        });
});

app.route('/users')
    .get((req, res) => {
        console.log(users)
        res.json(users)
    });

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});