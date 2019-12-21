const db = require('../Configs/db');

module.exports = {
    usernameCheck: (username) => {
        pattern = new RegExp(/^[a-z0-9]+$/); //alphanum
        alphanum = pattern.test(username);
        if (alphanum == false || username.length <= 5 || username.length >= 16) {
            return false;
        } else {
            companyCheck(username).then(response => {
                if (response.length != 0) {
                    return false;
                } else {
                    engineerCheck(username).then(response => {
                        if (response.length != 0) {
                            return false;
                        } else {
                            return true;
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        }
    },
    passwordCheck: (password) => {
        if (password.length <= 5 || password.length >= 32) {
            return false
        } else {
            return true
        }
    }
}

function companyCheck(username) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM company WHERE username = ? LIMIT 1", username, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        })
    })
}

function engineerCheck(username) {
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