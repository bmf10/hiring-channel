const model = require('../Models/engineer');
const form = require('../Helpers/form');
const security = require('../Helpers/security');

module.exports = {
    getAllEngineer: (_, res) => {
        model.getAllEngineer().then(response => {
            form.success(res, response);
        }).catch(err => {
            console.log(err);
        })
    },
    postEngineer: (req, res) => {
        const {
            body
        } = req;
        model.postEngineer(body).then(response => {
            var password = security.encrypt(body.password);
            const data = {
                id: response.insertId,
                name: body.name,
                description: body.description,
                location: body.location,
                date_of_birth: body.date_of_birth,
                date_created: body.date_created,
                username: body.username,
                password: password,
            };
            const msg = 'success'
            form.success(res, data, msg);
        }).catch(err => console.log(err));
    },
    postSkill: (req, res) => {
        const {
            params,
            body
        } = req;
        model.postSkill(body, params).then(response => {
            const data = {
                id: response.insertId,
                skill_name: body.skill_name,
                level: body.level,
                id_engineer: params.id,
            }
            const msg = 'success';
            form.success(res, data, msg);
        }).catch(err => console.log(err));
    },
    postShowcase: (req, res) => {
        const {
            params,
            body
        } = req;
        model.postShowcase(body, params).then(response => {
            const data = {
                id: response.insertId,
                skill_name: body.showcase_name,
                year: body.year,
                level: body.level,
                id_engineer: params.id,
            }
            const msg = 'success';
            form.success(res, data, msg);
        }).catch(err => console.log(err));
    },
    patchEngineer: (req, res) => {
        const {
            params,
            query
        } = req;
        model.patchEngineer(query, params).then(response => {
            const data = query;
            const msg = 'success';
            form.success(res, data, msg);
        }).catch(err => console.log(err))
    },
    deleteEngineer: (req, res) => {
        const {
            params
        } = req;
        model.deleteEngineer(params).then(response => {
            const data = {
                description: "Deleted"
            };
            const msg = 'success';
            form.success(res, data, msg)
        }).catch(err => console.log(err));
    },
    patchSkill: (req, res) => {
        const {
            params,
            query
        } = req;
        model.patchSkill(params, query).then(response => {
            const data = query;
            const msg = 'success';
            form.success(res, data, msg);
        }).catch(err => console.log(err))
    },
    patchShowcase: (req, res) => {
        const {
            params,
            query
        } = req;
        model.patchShowcase(params, query).then(response => {
            const data = query;
            const msg = 'success';
            form.success(res, data, msg);
        }).catch(err => console.log(err))
    },
    deleteSkill: (req, res) => {
        const {
            params
        } = req;
        model.deleteSkill(params).then(response => {
            const data = {
                description: "Deleted"
            };
            const msg = 'success';
            form.success(res, data, msg)
        }).catch(err => console.log(err));
    },
    deleteShowcase: (req, res) => {
        const {
            params
        } = req;
        model.deleteShowcase(params).then(response => {
            const data = {
                description: "Deleted"
            };
            const msg = 'success';
            form.success(res, data, msg)
        }).catch(err => console.log(err));
    },
}