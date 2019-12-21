const express = require('express');
const controller = require('../Controllers/auth');

const Router = express.Router();

Router.post('/', controller.login);
Router.post('/engineer', controller.registerEngineer);
Router.post('/company', controller.registerCompany);
Router.post('/adminlogin', controller.adminLogin);

module.exports = Router;