require('dotenv/config');

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const router = require('./src/Routes/index');

const index = express();

index.listen(8000, () => {
    console.log('Server is Running');
})

index.use(logger('dev'));
index.use(helmet.xssFilter());
index.use(cors());
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({
    extended: false
}))

index.use('/', router);

module.exports = index;