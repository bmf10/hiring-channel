const db = require('../Configs/db');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

module.exports = {
    getData: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT engineer.*, GROUP_CONCAT(DISTINCT CONCAT(skill.skill_name, ',', skill.level) SEPARATOR ';') AS skill_list, GROUP_CONCAT(DISTINCT CONCAT(showcase.showcase_name, ',', showcase.year) SEPARATOR ';') AS showcase_list FROM engineer LEFT JOIN skill ON(engineer.id = skill.id_engineer) LEFT JOIN showcase ON (`engineer`.`id` = `showcase`.`id_engineer`) WHERE engineer.id=? GROUP BY engineer.id", id, (err, response) => {
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
        var date_updated = new Date();
        Object.assign(query, {
            "date_update": date_updated
        });
        return new Promise((resolve, reject) => {
            db.query('UPDATE engineer SET ? WHERE id=?', [query, id], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    postSkill: (body, id) => {
        var values = [
            [body.skill_name, body.level, id]
        ]

        console.log(values);
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
    patchSkill: (params, query, id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE skill SET ? WHERE id_engineer= ? AND id=?', [query, id, params.skillId], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    deleteSkill: (params, id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM skill WHERE id_engineer= ? AND id=?', [id, params.skillId], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    postShowcase: (body, id) => {
        var values = [
            [body.showcase_name, body.year, id]
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
    patchShowcase: (params, query, id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE showcase SET ? WHERE id_engineer= ? AND id=?', [query, id, params.showcaseId], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    deleteShowcase: (params, id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM showcase WHERE id_engineer= ? AND id=?', [id, params.showcaseId], (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
}