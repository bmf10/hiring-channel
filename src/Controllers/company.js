const model = require('../Models/company');
const form = require('../Helpers/form');
const security = require('../Helpers/security');
// const {
//     check,
//     validationResult
// } = require('express-validator');

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
        // try {
        //     check(req.body.username).isLength({
        //         min: 5,
        //         max: 12
        //     })
        //     check(req.body.username).isAlphanumeric();
        //     const errors = validationResult(req);
        //     console.log(req.body.username);
        //     if (!errors.isEmpty()) {
        //         form.error(errors.array);
        //     }
        // } catch (err) {
        //     return next(err)
        // }
        model.postCompany(body).then(response => {
            var password = security.encrypt(body.password);
            var decrypt = security.decrypt(password);
            const data = {
                id: response.insertId,
                company_name: body.company_name,
                logo: body.logo,
                location: body.location,
                description: body.description,
                username: body.username,
                password: password,
                decryptpassword: decrypt
            };
            const msg = 'success'
            form.success(res, data, msg);
        }).catch(err => console.log(err));
    },
    patchCompany: (req, res) => {
        const {
            params,
            query
        } = req;
        model.patchCompany(query, params).then(response => {
            const data = query;
            const msg = 'success'
            form.success(res, data, msg);
        }).catch(err => console.log(err))
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