const db = require('../Configs/db');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

module.exports = {
    getData: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT engineer.*, GROUP_CONCAT(DISTINCT skill.skill_name SEPARATOR ', ') AS skill_list, GROUP_CONCAT(DISTINCT CONCAT(showcase.showcase_name, ',', showcase.year) SEPARATOR ';') AS showcase_list FROM engineer LEFT JOIN skill ON(engineer.id = skill.id_engineer) LEFT JOIN showcase ON (`engineer`.`id` = `showcase`.`id_engineer`) WHERE engineer.id=? GROUP BY engineer.id", id, (err, response) => {
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
    getSkill: (id)=>{
        return new Promise((resolve, reject)=>{
            db.query('SELECT * FROM skill WHERE id_engineer = ?', id, (err,response)=>{
                if(!err){
                    resolve(response);
                }else{
                    reject(err);
                }
            })
        })
    },
    getProject: (id)=>{
        return new Promise((resolve, reject)=>{
            db.query("SELECT * FROM project WHERE id_engineer = ? ORDER BY FIELD(STATUS, 'Ongoing', 'Finish')", id, (err,response)=>{
                if(!err){
                    resolve(response);
                }else{
                    reject(err)
                }
            })
        })
    },
    getRequestProject: (id)=>{
        return new Promise((resolve, reject)=>{
            db.query("SELECT `request`.* , `project`.`id_project` , `project`.`project_name` , `project`.`description` , `company`.`company_name` FROM `request` INNER JOIN `project` ON(`request`.`id_project` = `project`.`id_project`) INNER JOIN `company` ON (`project`.`id_company` = `company`.`id`) WHERE request.id_engineer = ? AND is_accept IS NULL ORDER BY DATE ASC", id, (err, response)=>{
                if(!err){
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    },
    checkOngoingProject: (id)=>{
        return new Promise((resolve,reject)=>{
            db.query("SELECT COUNT(*) AS ongoing FROM project WHERE id_engineer=? AND status='Ongoing'", id, (err, response)=>{
                if(!err){
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    },
    executeRequest: (query, id)=>{
        return new Promise((resolve, reject)=>{
            db.query("UPDATE request SET is_accept=? WHERE id_project = ? AND id_engineer= ? AND id=?", [query.is_accept, query.id_project, id, query.id_request], (err, response)=>{
                if(!err){
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    },
    deleteRequest: (query)=>{
        return new Promise((resolve, reject)=>{
            db.query("DELETE FROM request WHERE id_project=? AND is_accept IS NULL;", query.id_project, (err, response)=>{
                if(!err){
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    }
}