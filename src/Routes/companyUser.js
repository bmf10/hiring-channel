const express = require('express');
const jwt = require('jsonwebtoken');
const form = require('../Helpers/form');
const controller = require('../Controllers/companyUser');

const Router = express.Router();

Router.get('/', Auth, controller.getData);
Router.patch('/', Auth, controller.patchData);
Router.post('/project', Auth, controller.postProject);
Router.get('/project', Auth, controller.getProject);
Router.delete('/project/:projectId', Auth, controller.deleteProject);
Router.get('/projectlist', Auth, controller.getAvailableProject);

Router.patch('/projectfinish', Auth, controller.finishProject);
Router.post('/projectrequest', Auth, controller.postRequestProject);

function Auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        msg = 'error';
        errors = 'Unauthorized';
        status = 401;
        form.error(res, errors, msg, status);
    } else {
        verif = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_COMPANY, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                next();
            }
        });
    }
}

module.exports = Router;