const express = require('express');
const company = require('./company');
const engineer = require('./engineer');
const auth = require('./auth');
const companyUser = require('./companyUser');
const engineerUser = require('./engineerUser');

const Router = express.Router();

Router.use('/company', company);
Router.use('/engineer', engineer);
Router.use('/auth', auth);
Router.use('/companyuser', companyUser);
Router.use('/engineeruser', engineerUser);

module.exports = Router;