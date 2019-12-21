const db = require('../Configs/db');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

module.exports = {
    checkCompany: (body) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM company WHERE username='" + body.username + "' LIMIT 1", (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    checkEngineer: (body) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM engineer WHERE username='" + body.username + "' LIMIT 1", (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    postEngineer: body => {
        //var password = security.encrypt(body.password);
        var date_created = new Date();
        var password = bcrypt.hashSync(body.password, salt);
        var values = [
            [body.name, body.description, body.location, body.date_of_birth, date_created, body.username, password]
        ]
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO engineer(name, description, location, date_of_birth, date_created, username, password) values (?)", values, (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err)
                }
            })
        })
    },
    postCompany: (body) => {
        var password = bcrypt.hashSync(body.password, salt);
        var values = [
            [body.company_name, body.logo, body.location, body.description, body.username, password],
        ]
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO company(company_name, logo, location, description, username, password) values (?)", values, (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    checkAdmin: (body) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM admin WHERE username='" + body.username + "' LIMIT 1", (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    }
}