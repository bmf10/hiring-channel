const db = require('../Configs/db');
const security = require('../Helpers/security');

module.exports = {
    getAllEngineer: () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT engineer.*, GROUP_CONCAT(DISTINCT CONCAT(showcase.showcase_name, ',', showcase.year) SEPARATOR ';') AS showcase_list, GROUP_CONCAT(DISTINCT CONCAT(skill.skill_name, ',', skill.level) SEPARATOR ';') AS skill_list FROM skill INNER JOIN engineer ON(skill.id_engineer = engineer.id) INNER JOIN  showcase ON(showcase.id_engineer = engineer.id) GROUP BY engineer.id", (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    postEngineer: body => {
        var password = security.encrypt(body.password);
        var date_created = new Date();
        console.log(date_created);
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
    postSkill: (body, params) => {
        var values = [
            [body.skill_name, body.level, params.id]
        ]
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO skill(skill_name, level, id_engineer) values (?)", values, (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    postShowcase: (body, params) => {
        var values = [
            [body.showcase_name, body.year, params.id]
        ]
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO showcase(showcase_name, year, id_engineer) values (?)", values, (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    patchEngineer: (query, params) => {
        if (query.password != null) {
            query.password = security.encrypt(query.password);
        }
        var date_updated = new Date();
        Object.assign(query, {
            "date_update": date_updated
        });
        console.log(query);
        return new Promise((resolve, reject) => {
            db.query('UPDATE engineer SET ? WHERE ?', [query, params], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    deleteEngineer: (params) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM engineer WHERE ?', params, (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    patchSkill: (params, query) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE skill SET ? WHERE id_engineer= ? AND id=?', [query, params.engineerId, params.skillId], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    patchShowcase: (params, query) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE showcase SET ? WHERE id_engineer= ? AND id=?', [query, params.engineerId, params.shocaseId], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    deleteSkill: (params) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM skill WHERE id_engineer= ? AND id=?', [params.engineerId, params.skillId], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    deleteShowcase: (params) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM showcase WHERE id_engineer= ? AND id=?', [params.engineerId, params.skillId], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
}