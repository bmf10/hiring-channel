const express = require('express');
const controller = require('../Controllers/engineerUser');
const jwt = require('jsonwebtoken');
const form = require('../Helpers/form');

const Router = express.Router();

Router.get('/', Auth, controller.getData);
Router.patch('/', Auth, controller.patchData);
Router.post('/skill', Auth, controller.postSkill);
Router.patch('/skill/:skillId', Auth, controller.patchSkill);
Router.delete('/skill/:skillId', Auth, controller.deleteSkill);

Router.post('/showcase', Auth, controller.postShowcase);
Router.patch('/showcase/:showcaseId', Auth, controller.patchShowcase);
Router.delete('/showcase/:showcaseId', Auth, controller.deleteShowcase);

function Auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        msg = 'error';
        errors = 'Unauthorized';
        status = 401;
        form.error(res, errors, msg, status);
    } else {
        verif = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_ENGINEER, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                next();
            }
        });
    }
}

module.exports = Router;