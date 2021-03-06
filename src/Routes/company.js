const express = require('express');
const controller = require('../Controllers/company');
const jwt = require('jsonwebtoken');
const form = require('../Helpers/form');

const Router = express.Router();

Router.get('/', controller.getAllCompany);
Router.post('/', Auth, controller.postCompany);
Router.patch('/:id', Auth, controller.patchCompany);
Router.delete('/:id', Auth, controller.deleteCompany);

function Auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        msg = 'error';
        errors = 'Unauthorized';
        status = 401;
        form.error(res, errors, msg, status);
    } else {
        verif = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_ADMIN, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                next();
            }
        });
    }
}

module.exports = Router;