const db = require('../Configs/db');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

module.exports = {
    getAllCompany: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM company', (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
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
    patchCompany: (query, params) => {
        if (query.password != null) {
            query.password = bcrypt.hashSync(query.password, salt);
        }
        return new Promise((resolve, reject) => {
            db.query('UPDATE company SET ? WHERE ?', [query, params], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    deleteCompany: (params) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM company WHERE ?', params, (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            });
        })
    }
}