const db = require('../Configs/db');

module.exports = {
    getData: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM company Where id=?", id, (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    patchData: (query, id) => {
        if (query.password != null) {
            query.password = bcrypt.hashSync(query.password, salt);
        }
        return new Promise((resolve, reject) => {
            db.query('UPDATE company SET ? WHERE id=?', [query, id], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    }
}