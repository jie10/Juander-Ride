const express = require('express');
const fs = require('fs');
const methodOverride = require('method-override');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const moment = require('moment');

const PORT = process.env.PORT || 8000;
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json'));
const rideLogs = JSON.parse(fs.readFileSync(__dirname + '/ride-logs.json'));
const rides = JSON.parse(fs.readFileSync(__dirname + '/rides.json'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const checkLoginSession = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.status(400).json({
            "status": 400,
            "title": "User already logged in",
            "message": "Current user has existing session. Please logout to login again.",
            "inCurrentSession": true
        });
    }
};

const checkCurrentSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({
            "status": 401,
            "title": "Unauthorized Access",
            "message": "Please redirect to login page and try again.",
            "inCurrentSession": true
        });
    }
};

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
                        "_id": uuidv4(),
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

const viewUser = (email, toEdit) => {
    return new Promise((resolve, reject) => {
        try {
            if (email) {
                const user = users && users.length > 0 ? users.filter(user => {
                    return user.account.email === email;
                }) : null;
        
                const result = user && user.length > 0 ? { "status": 200, "title": "User found", "message": "User exists from our database", "data": user.map(user => {
                    let { account, name, department, job_role, employee_id, profile, avatar_image } = user;

                    if (toEdit && toEdit === "true") {
                        return {
                            email: account.email,
                            password: account.password,
                            access_role: account.access_role,
                            name,
                            avatar_image,
                            department,
                            job_role,
                            employee_id,
                            profile
                        };
                    } else {
                        return {
                            email: account.email,
                            access_role: account.access_role,
                            name,
                            avatar_image,
                            department,
                            job_role,
                            employee_id,
                            profile
                        };
                    }
                })[0] } : {
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
                }) : null;

                const result = user && user.length > 0 ? { "status": 200, "title": "Scan succesful", "message": "User foundU from our database", "data": user.map(user => ({
                    "employee_id": user.employee_id,
                    "name": user.name,
                    "department": user.department,
                    "job_role": user.job_role,
                    "point_of_origin": user.profile.point_of_origin,
                    "onsite_schedule": user.profile.onsite_schedule,
                    "onsite_days": user.profile.onsite_days
                }))[0] } : {
                    "status": 404,
                    "title": "Scan failed",
                    "message": "User not found. Please login and try again."
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

const scanQRCodeToRide = (email, shuttleServiceId) => {
    return new Promise((resolve, reject) => {
        try {
            if (email) {
                const user = users && users.length > 0 ? users.filter(user => {
                    return user.account.email === email;
                }) : null;

                if (user && user.length > 0) {
                    rideLogs.push({
                        "_id": uuidv4(),
                        "email": users[0].account.email,
                        "employee_id": users[0].employee_id,
                        "shuttle_service_id": shuttleServiceId,
                        "log_datetime": moment.utc().format()
                    });

                    resolve({
                                "status": 200,
                                "title": "Scan successful",
                                "message": "You can now use the shuttle service",
                                "data": rideLogs
                            });
                } else {
                    resolve({
                        "status": 404,
                        "title": "Scan failed",
                        "message": "User not found. Please login and try again."
                    });
                }
            } else {
                resolve({ "status": 400, "title": "Incomplete request", "message": "Please make sure you indicate user email to retrieve their data" })
            }
        } catch(err) {
            reject(err);
        }
    });
}

const searchRide = (query, filterByDays, filterByAvailability) => {
    return new Promise((resolve, reject) => {
        try {
            if (query) {
                const matches = rides && rides.length > 0 ? rides.filter(ride => {
                    return ride.vehicle_id === query || ride.vehicle_plate_number === query;
                }) : null;

                if (matches && matches.length > 0) {
                    let matchWithFilter = filterByDays ? matches.filter(match => {
                        return match.schedule_days.split(',').filter(d => {
                            return filterByDays.split(',').some(day => {
                                return new RegExp(day, 'gi').test(d)
                            })
                        }).length > 0
                    }) : null;

                    matchWithFilter = filterByAvailability ? matchWithFilter.filter(match => String(match.isAvailable) === filterByAvailability) : matchWithFilter;

                    if (matchWithFilter) {
                        resolve({
                                "status": 200,
                                "title": "Search succesful",
                                "message": "Found " + matchWithFilter.length + (matchWithFilter.length > 1 ? " matches" : " match") + " for keyword: " + query,
                                "result": matchWithFilter.length > 0 ? matchWithFilter.map(driver => {
                                    driver.isAvailable = driver.isAvailable ? "AVAILABLE" : "NOT AVAILABLE";
                                    return driver;
                                }) : []
                        });  
                    } else {
                        resolve({
                                "status": 200,
                                "title": "Search succesful",
                                "message": "Found " + matches.length + (matches.length > 0 ? " match" : " matches") + " for keyword: " + query,
                                "result": matches.map(driver => {
                                    driver.isAvailable = driver.isAvailable ? "AVAILABLE" : "NOT AVAILABLE";
                                    return driver;
                                })
                        });  
                    }
                } else {
                    resolve({
                        "status": 404,
                        "title": "Search failed",
                        "message": "No match found with keyword " + query
                    });
                }
            } else if (filterByDays || filterByAvailability) {
                let matchWithFilter = filterByDays ? rides.filter(match => {
                    return match.schedule_days.split(',').filter(d => {
                        return filterByDays.split(',').some(day => {
                            return new RegExp(day, 'gi').test(d)
                        })
                    }).length > 0
                }) : rides;

                matchWithFilter = filterByAvailability ? matchWithFilter.filter(match => String(match.isAvailable) === filterByAvailability) : matchWithFilter;

                if (matchWithFilter) {
                    resolve({
                            "status": 200,
                            "title": "Search succesful",
                            "message": "Found " + matchWithFilter.length + (matchWithFilter.length > 1 ? " matches" : " match") + " for keyword: " + query,
                            "result": matchWithFilter.length > 0 ? matchWithFilter.map(driver => {
                                driver.isAvailable = driver.isAvailable ? "AVAILABLE" : "NOT AVAILABLE";
                                return driver;
                            }) : []
                    });  
                } else {
                    resolve({
                        "status": 404,
                        "title": "Search failed",
                        "message": "No match found with keyword " + query
                    });
                }
            } else {
                resolve(rides && rides.length > 0 ? {
                    "status": 200,
                    "title": "Load Successful",
                    "message": rides.length + " rides found",
                    "data": rides.map(driver => {
                        driver.isAvailable = driver.isAvailable ? "AVAILABLE" : "NOT AVAILABLE";
                        return driver;
                    })
                } : {
                    "status": 200,
                    "title": "Load Successful",
                    "message": "No rides found"
                });  
            }

        } catch(err) {
            reject(err);
        }
    });
}

const viewRideLogs = (email) => {
    return new Promise((resolve, reject) => {
        try {
            if (email) {
                const logs = rideLogs && rideLogs.length > 0 ? rideLogs.filter(rideLog => {
                    return rideLog.email === email;
                }) : null;

                if (logs && logs.length > 0) {
                    let driverInfo = rides.filter(driver => {
                        return driver.vehicle_id === logs[0].shuttle_service_id;
                    });

                    resolve({
                        "status": 200,
                        "title": "Ride logs found",
                        "message": "Found logs from current user",
                        "data": logs.map(log => {
                                let { log_datetime } = log;
                                let driver = driverInfo[0];
                                return {
                                    "vehicle_id": driver.vehicle_id,
                                    "vehicle_plate_number": driver.vehicle_plate_number,
                                    "vehicle_type": driver.vehicle_type,
                                    "vehicle_color": driver.vehicle_color,
                                    "driver_id": driver.driver_id,
                                    "log_datetime": moment(log_datetime).format('MM-DD-YYYY h:mm A'),
                                    "log_timestamp": log_datetime
                                }
                            })
                    });
                } else {
                    resolve({
                        "status": 404,
                        "title": "No ride logs yet",
                        "message": "No logs found from current user"
                    });
                }
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

app.post('/user/scan', (req, res) => {
    scanUserQRCode(req.body.email)
        .then(result => res.status(result.status).json(result))
        .catch(err => {
            res.status(500).json(err);
            console.error(err);
        });
});

app.get('/user/rides', (req, res) => {
    viewRideLogs(req.body.email)
        .then(result => res.status(result.status).json(result))
        .catch(err => {
            res.status(500).json(err);
            console.error(err);
        });
});

app.route('/user/ride')
    .get(checkCurrentSession, (req, res) => {
        let query = req.query.q;
        let filterByDays = req.query.fdays;
        let filterByAvailability = req.query.favail;

        searchRide(query, filterByDays, filterByAvailability)
            .then(result => res.status(result.status).json(result))
            .catch(err => {
                res.status(500).json(err);
                console.error(err);
            });
    })
    .post(checkCurrentSession, (req, res) => {
        scanQRCodeToRide(req.body.email, req.body.shuttle_service_id)
            .then(result => res.status(result.status).json(result))
            .catch(err => {
                res.status(500).json(err);
                console.error(err);
            });
    });

app.post('/user/view', (req, res) => {
    viewUser(req.body.email, req.query.edit)
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
    .get(checkCurrentSession, (req, res) => {
        res.json(users)
    });

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});