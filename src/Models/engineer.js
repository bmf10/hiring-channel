const db = require('../Configs/db');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

module.exports = {
    getAllEngineer: query => {
        var limit = query.limit || 100;

        if (limit == 0) {
            limit = 100;
            var page = 1
            var offset = (page - 1) * limit;
        } else {
            var page = query.page || 1;
            var offset = (page - 1) * limit;
        }
        var sort = query.sort || 'name';
        var order = query.order || 'asc';

        if (query.name == null) {
            name = "";
        } else {
            name = query.name;
        }

        var test = "hello"

        return new Promise((resolve, reject) => {
            db.query("SELECT `engineer`.* , GROUP_CONCAT(DISTINCT CONCAT(skill.skill_name, ',', skill.level) SEPARATOR ';') AS skill_list , GROUP_CONCAT(DISTINCT CONCAT(showcase.showcase_name, ',', showcase.year) SEPARATOR ';') AS showcase_list FROM `engineer` LEFT JOIN `skill` ON (`engineer`.`id` = `skill`.`id_engineer`) LEFT JOIN `showcase` ON (`engineer`.`id` = `showcase`.`id_engineer`) WHERE NAME LIKE '%" + name + "%' GROUP BY engineer.id ORDER BY " + sort + " " + order + " LIMIT " + limit + " OFFSET " + offset + "", (err, response) => {
                if (!err) {
                    resolve([response, limit, page]);
                } else {
                    reject(err);
                }
            })
        })
    },
    CountEngineer: () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT count(*) as count FROM engineer", (err, response) => {
                if (!err) {
                    resolve(response[0].count);
                } else {
                    reject(err)
                }
            });
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
            query.password = bcrypt.hashSync(query.password, salt);
        }
        var date_updated = new Date();
        Object.assign(query, {
            "date_update": date_updated
        });
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
            db.query('UPDATE showcase SET ? WHERE id_engineer= ? AND id=?', [query, params.engineerId, params.showcaseId], (err, response) => {
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
    getResultSearch: (query) => {
        if ((query.skill == null) && (query.name == null)) {
            sql = "SELECT engineer.*, GROUP_CONCAT(DISTINCT CONCAT(skill.skill_name, ',', skill.level) SEPARATOR ';') AS skill_list, GROUP_CONCAT(DISTINCT CONCAT(showcase.showcase_name, ',', showcase.year) SEPARATOR ';') AS showcase_list FROM engineer LEFT JOIN skill ON(engineer.id = skill.id_engineer) LEFT JOIN showcase ON (`engineer`.`id` = `showcase`.`id_engineer`) WHERE engineer.name LIKE '%%'"
            sql += "GROUP BY engineer.id"
            console.log("dual null");
        } else if (query.name == null) {
            sql = "SELECT engineer.*, GROUP_CONCAT(DISTINCT CONCAT(skill.skill_name, ',', skill.level) SEPARATOR ';') AS skill_list, GROUP_CONCAT(DISTINCT CONCAT(showcase.showcase_name, ',', showcase.year) SEPARATOR ';') AS showcase_list FROM engineer LEFT JOIN skill ON(engineer.id = skill.id_engineer) LEFT JOIN showcase ON (`engineer`.`id` = `showcase`.`id_engineer`) WHERE skill.skill_name LIKE '%" + query.skill + "%'"
            sql += "GROUP BY engineer.id"
            console.log("name null");
        } else if (query.skill == null) {
            sql = "SELECT engineer.*, GROUP_CONCAT(DISTINCT CONCAT(skill.skill_name, ',', skill.level) SEPARATOR ';') AS skill_list, GROUP_CONCAT(DISTINCT CONCAT(showcase.showcase_name, ',', showcase.year) SEPARATOR ';') AS showcase_list FROM engineer LEFT JOIN skill ON(engineer.id = skill.id_engineer) LEFT JOIN showcase ON (`engineer`.`id` = `showcase`.`id_engineer`) WHERE engineer.name  LIKE '%" + query.name + "%'"
            sql += "GROUP BY engineer.id"
            console.log("skill null");
        } else if ((query.skill != null || typeof query.skill !== '') && (query.name != null || typeof query.name !== '')) {
            sql = "SELECT engineer.*, GROUP_CONCAT(DISTINCT CONCAT(skill.skill_name, ',', skill.level) SEPARATOR ';') AS skill_list, GROUP_CONCAT(DISTINCT CONCAT(showcase.showcase_name, ',', showcase.year) SEPARATOR ';') AS showcase_list FROM engineer LEFT JOIN skill ON(engineer.id = skill.id_engineer) LEFT JOIN showcase ON (`engineer`.`id` = `showcase`.`id_engineer`) WHERE engineer.name LIKE '%" + query.name + "%'"
            sql += "AND skill.skill_name LIKE '%" + query.skill + "%'"
            sql += "GROUP BY engineer.id"
            console.log("not null");
        }

        return new Promise((resolve, reject) => {
            db.query(sql, (err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    }
}