const express = require('express');
const company = require('./company');
const engineer = require('./engineer');
const search = require('./search');

const Router = express.Router();

Router.use('/company', company);
Router.use('/engineer', engineer);
Router.use('/search', search);

module.exports = Router;