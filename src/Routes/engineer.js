const express = require('express');
const controller = require('../Controllers/engineer');
const jwt = require('jsonwebtoken');
const form = require('../Helpers/form');

const Router = express.Router();

Router.get('/', controller.getAllEngineer);
Router.get('/search', controller.getResultSearch);

Router.post('/', Auth, controller.postEngineer);
Router.post('/:id/skill', Auth, controller.postSkill);
Router.post('/:id/showcase', Auth, controller.postShowcase);

Router.patch('/:id', Auth, controller.patchEngineer);
Router.patch('/:engineerId/skill/:skillId', Auth, controller.patchSkill);
Router.patch('/:engineerId/showcase/:showcaseId', Auth, controller.patchShowcase);

Router.delete('/:id', Auth, controller.deleteEngineer);
Router.delete('/:engineerId/skill/:skillId', Auth, controller.deleteSkill);
Router.delete('/:engineerId/showcase/:skillId', Auth, controller.deleteShowcase);

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