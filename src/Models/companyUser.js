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
    },
    postProject: (body, id)=>{
        date = new Date();
        let values = [
            [body.project_name, date, body.description, 'Pending', id,]
        ]
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO project (project_name, date,description, status, id_company) values (?)', values, (err,response)=>{
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            });
        })
    },
    getProject: (id)=>{
        return new Promise((resolve, reject)=>{
            db.query('SELECT `project`.* , `engineer`.`name` FROM `project` LEFT JOIN `engineer` ON(`project`.`id_engineer` = `engineer`.`id`) WHERE project.id_company = ?', id, (err,response)=>{
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            })
        })
    },
    deleteProject: (id_project, id_company) =>{
        return new Promise((resolve, reject)=>{
            db.query('DELETE FROM project WHERE id_project=? AND id_company=? AND STATUS="pending"', [id_project, id_company], (err, result)=>{
                if(result.affectedRows == 0){
                    resolve('failed')
                }else if(result.affectedRows > 0){
                    resolve('success')
                }else if(err){
                    console.log(err)
                }
            })
        })
    },
    getAvailableProject : (id_company)=>{
        return new Promise((resolve, reject)=>{
            db.query("SELECT * FROM project WHERE status='pending' and id_company = ?", id_company, (err,response)=>{
                if(!err){
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    },
    postRequestProject : (body)=>{
        let date = new Date();
        let values = [[body.id_project, body.id_engineer, date]];
        return new Promise((resolve, reject)=>{
            db.query("INSERT INTO request (id_project, id_engineer, date) VALUES (?)", values, (err, response)=>{
                if(!err){
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    },
    finishProject: (query)=>{
        return new Promise((resolve,reject)=>{
            db.query('UPDATE project SET status="Finish" WHERE id_project=?', query.id_project, (err, response)=>{
                if(!err){
                    resolve(response)
                }else{
                    reject(err)
                }
            })
        })
    }
}