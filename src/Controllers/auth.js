const form = require('../Helpers/form');
const model = require('../Models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validation = require('../Models/validation');

const accessTokenCompany = process.env.ACCESS_TOKEN_SECRET_COMPANY;
const accessTokenEngineer = process.env.ACCESS_TOKEN_SECRET_ENGINEER;
const accessTokenAdmin = process.env.ACCESS_TOKEN_SECRET_ADMIN;

module.exports = {
    login: (req, res) => {
        const {
            body
        } = req

        model.checkCompany(body).then(response => {
            if (response.length != 0) {
                result = bcrypt.compareSync(body.password, response[0].password);
                if (result == false) {
                    msg = 'error';
                    errors = 'Wrong Password';
                    status = 401;
                    form.error(res, errors, msg, status);
                } else {
                    const msg = 'success';
                    const payload = {
                        "id": response[0].id,
                        "company_name": response[0].company_name,
                        "logo": response[0].logo,
                        "location": response[0].location,
                        "description": response[0].description,
                        "username": response[0].username,
                        "password": response[0].password,
                        "login_as": "company"
                    }
                    const token = jwt.sign(payload, accessTokenCompany, {
                        expiresIn: 60 * 60
                    });
                    const data = {
                        token: token
                    }
                    form.success(res, data, msg);
                }
            } else {
                model.checkEngineer(body).then(response => {
                    if (response.length != 0) {
                        result = bcrypt.compareSync(body.password, response[0].password);
                        if (result == false) {
                            msg = 'error';
                            errors = 'Wrong Password';
                            status = 401;
                            form.error(res, errors, msg, status)
                        } else {
                            const msg = 'success';
                            const payload = {
                                "id": response[0].id,
                                "name": response[0].name,
                                "date_of_birth": response[0].date_of_birth,
                                "date_created": response[0].date_created,
                                "date_updated": response[0].date_updated,
                                "location": response[0].location,
                                "description": response[0].description,
                                "username": response[0].username,
                                "password": response[0].password,
                                "login_as": "engineer"
                            }
                            const token = jwt.sign(payload, accessTokenEngineer, {
                                expiresIn: 60 * 60
                            });
                            const data = {
                                token: token
                            }
                            form.success(res, data, msg);
                        }
                    } else {
                        msg = 'error';
                        errors = 'Username Not Found';
                        status = 401;
                        form.error(res, errors, msg, status)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err);
        });
    },
    registerEngineer: (req, res) => {
        const {
            body
        } = req;
        username = body.username;
        password = body.password;

        pattern = new RegExp(/^[a-zA-Z0-9]+$/); //alphanum
        alphanum = pattern.test(username);
        if ((alphanum == false || username.length <= 5 || username.length >= 16) && (password.length <= 5 || password.length >= 32)) {
            msg = 'error';
            errors = 'Invalid Username & Password';
            status = 200;
            form.error(res, errors, msg, status);
        } else if (alphanum == false || username.length <= 5 || username.length >= 16) {
            msg = 'error';
            errors = 'Invalid Username';
            status = 200;
            form.error(res, errors, msg, status);
        } else if (password.length <= 5 || password.length >= 32) {
            msg = 'error';
            errors = 'Invalid Password';
            status = 200;
            form.error(res, errors, msg, status);
        } else {
            validation.companyCheck(username).then(response => {
                if (response.length != 0) {
                    msg = 'error';
                    errors = 'Invalid Username';
                    status = 200;
                    form.error(res, errors, msg, status);
                } else {
                    validation.engineerCheck(username).then(response => {
                        if (response.length != 0) {
                            msg = 'error';
                            errors = 'Invalid Username';
                            status = 200;
                            form.error(res, errors, msg, status);
                        } else {
                            model.postEngineer(body).then(response => {
                                const data = {
                                    id: response.insertId,
                                    name: body.name,
                                    description: body.description,
                                    location: body.location,
                                    date_of_birth: body.date_of_birth,
                                    date_created: body.date_created,
                                    username: body.username,
                                };
                                const msg = 'success'
                                form.success(res, data, msg);
                            }).catch(err => console.log(err));
                        }
                    }).catch(err => console.log(err));
                }
            }).catch(err => console.log(err))
        }
    },
    registerCompany: (req, res) => {
        const {
            body
        } = req;
        username = body.username;
        password = body.password;

        pattern = new RegExp(/^[a-zA-Z0-9]+$/); //alphanum
        alphanum = pattern.test(username);
        if ((alphanum == false || username.length <= 5 || username.length >= 16) && (password.length <= 5 || password.length >= 32)) {
            msg = 'error';
            errors = 'Invalid Username & Password';
            status = 200;
            form.error(res, errors, msg, status);
        } else if (alphanum == false || username.length <= 5 || username.length >= 16) {
            msg = 'error';
            errors = 'Invalid Username';
            status = 200;
            form.error(res, errors, msg, status);
        } else if (password.length <= 5 || password.length >= 32) {
            msg = 'error';
            errors = 'Invalid Password';
            status = 200;
            form.error(res, errors, msg, status);
        } else {
            validation.companyCheck(username).then(response => {
                if (response.length != 0) {
                    msg = 'error';
                    errors = 'Invalid Username';
                    status = 200;
                    form.error(res, errors, msg, status);
                } else {
                    validation.engineerCheck(username).then(response => {
                        if (response.length != 0) {
                            msg = 'error';
                            errors = 'Invalid Username';
                            status = 200;
                            form.error(res, errors, msg, status);
                        } else {
                            model.postCompany(body).then(response => {
                                const data = {
                                    id: response.insertId,
                                    company_name: body.company_name,
                                    logo: body.logo,
                                    location: body.location,
                                    description: body.description,
                                    username: body.username,
                                };
                                const msg = 'success'
                                form.success(res, data, msg);
                            }).catch(err => console.log(err));
                        }
                    }).catch(err => console.log(err));
                }
            }).catch(err => console.log(err))
        }
    },
    adminLogin: (req, res) => {
        const {
            body
        } = req

        model.checkAdmin(body).then(response => {
            if (response.length != 0) {
                result = bcrypt.compareSync(body.password, response[0].password);
                if (result == false) {
                    msg = 'error';
                    errors = 'Wrong Password';
                    status = 401;
                    form.error(res, errors, msg, status)
                } else {
                    const msg = 'success';
                    const payload = {
                        "id": response[0].id,
                        "username": response[0].name,
                        "login_as": "admin"
                    }
                    const token = jwt.sign(payload, accessTokenAdmin, {
                        expiresIn: 60 * 60
                    });
                    const data = {
                        token: token
                    }
                    form.success(res, data, msg);
                }
            } else {
                msg = 'error';
                errors = 'Username Not Found';
                status = 401;
                form.error(res, errors, msg, status)
            }
        }).catch(err => {
            console.log(err)
        })
    }
}