const db = require('../Configs/db');

module.exports = {
    companyCheck: username => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM company WHERE username = ? LIMIT 1", username, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            })
        })
    },
    engineerCheck: username => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM engineer WHERE username = ? LIMIT 1", username, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            })
        })
    }
}