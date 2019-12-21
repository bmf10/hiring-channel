const model = require('../Models/company');
const form = require('../Helpers/form');
const validation = require('../Models/validation');

module.exports = {
    getAllCompany: (_, res) => {
        model.getAllCompany().then(response => {
            const msg = 'success'
            form.success(res, response, msg);
        }).catch(err => {
            console.log(err);
        });
    },
    postCompany: (req, res) => {
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
    patchCompany: (req, res) => {
        const {
            params,
            query
        } = req;

        if (query.username != null) {
            username = query.username;
        } else {
            username = "ignorethis"
        }
        if (query.password != null) {
            password = query.password;
        } else {
            password = "ignorethis"
        }

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
                            model.patchCompany(query, params).then(response => {
                                const data = query;
                                const msg = 'success'
                                form.success(res, data, msg);
                            }).catch(err => console.log(err))
                        }
                    }).catch(err => console.log(err));
                }
            }).catch(err => console.log(err))
        }
    },
    deleteCompany: (req, res) => {
        const {
            params
        } = req;
        model.deleteCompany(params).then(response => {
            const data = {
                description: "Deleted"
            };
            const msg = 'success';
            form.success(res, data, msg)
        }).catch(err => console.log(err));
    }
}