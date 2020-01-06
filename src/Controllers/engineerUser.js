const jwtdecode = require('jwt-decode');
const model = require('../Models/engineerUser');
const form = require('../Helpers/form');
const validation = require('../Models/validation');

module.exports = {
  getData: (req, res) => {
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);

    model
      .getData(decoded['id'])
      .then(response => {
        const msg = 'success'
        form.success(res, response, msg);
      })
      .catch(err => {
        console.log(err);
      });
  },
  patchData: (req, res) => {
    const {query} = req;

    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);

    if (query.username != null) {
      username = query.username;
    } else {
      username = "ignorethis"
    }
    if (query.password != null) {
      password = query.password;
    } else {
      password = "ignorethis"
    }

    pattern = new RegExp(/^[a-zA-Z0-9]+$/); //alphanum
    alphanum = pattern.test(username);
    if ((alphanum == false || username.length <= 5 || username.length >= 16) && (password.length <= 5 || password.length >= 32)) {
      msg = 'error';
      errors = 'Invalid Username & Password';
      status = 200;
      form.error(res, errors, msg, status);
    } else if (alphanum == false || username.length <= 5 || username.length >= 16) {
      msg = 'error';
      errors = 'Invalid Username';
      status = 200;
      form.error(res, errors, msg, status);
    } else if (password.length <= 5 || password.length >= 32) {
      msg = 'error';
      errors = 'Invalid Password';
      status = 200;
      form.error(res, errors, msg, status);
    } else {
      validation
        .companyCheck(username)
        .then(response => {
          if (response.length != 0) {
            msg = 'error';
            errors = 'Invalid Username';
            status = 200;
            form.error(res, errors, msg, status);
          } else {
            validation
              .engineerCheck(username)
              .then(response => {
                if (response.length != 0) {
                  msg = 'error';
                  errors = 'Invalid Username';
                  status = 200;
                  form.error(res, errors, msg, status);
                } else {
                  model
                    .patchData(query, decoded['id'])
                    .then(response => {
                      const data = query;
                      const msg = 'success'
                      form.success(res, data, msg);
                    })
                    .catch(err => console.log(err))
                }
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err))
    }
  },
  postSkill: (req, res) => {
    const {body} = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .postSkill(body, decoded['id'])
      .then(response => {
        const data = {
          id: response.insertId,
          skill_name: body.skill_name,
          level: body.level,
          id_engineer: decoded['id']
        }
        const msg = 'success';
        form.success(res, data, msg);
      })
      .catch(err => console.log(err));
  },
  patchSkill: (req, res) => {
    const {params, query} = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .patchSkill(params, query, decoded['id'])
      .then(response => {
        const data = query;
        const msg = 'success';
        form.success(res, data, msg);
      })
      .catch(err => console.log(err))
  },
  deleteSkill: (req, res) => {
    const {params} = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .deleteSkill(params, decoded['id'])
      .then(response => {
        const data = {
          description: "Deleted"
        };
        const msg = 'success';
        form.success(res, data, msg)
      })
      .catch(err => console.log(err));
  },
  postShowcase: (req, res) => {
    const {body} = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .postShowcase(body, decoded['id'])
      .then(response => {
        const data = {
          id: response.insertId,
          skill_name: body.showcase_name,
          year: body.year,
          level: body.level,
          id_engineer: decoded['id']
        }
        const msg = 'success';
        form.success(res, data, msg);
      })
      .catch(err => console.log(err));
  },
  patchShowcase: (req, res) => {
    const {params, query} = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .patchShowcase(params, query, decoded['id'])
      .then(response => {
        const data = query;
        const msg = 'success';
        form.success(res, data, msg);
      })
      .catch(err => console.log(err))
  },
  deleteShowcase: (req, res) => {
    const {params} = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .deleteShowcase(params, decoded['id'])
      .then(response => {
        const data = {
          description: "Deleted"
        };
        const msg = 'success';
        form.success(res, data, msg)
      })
      .catch(err => console.log(err));
  },
  getSkill: (req, res) => {
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .getSkill(decoded['id'])
      .then(response => {
        const msg = 'success';
        form.success(res, response, msg);
      })
      .catch(err => {
        console.log(err);
      })
  },
  getProject: (req, res) => {
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .getProject(decoded['id'])
      .then(response => {
        const msg = 'success';
        form.success(res, response, msg);
      })
      .catch(err => {
        console.log(err);
      })
  },
  getRequest: (req, res)=>{
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model.getRequestProject(decoded['id']).then(response=>{
        const msg = 'success';
        form.success(res, response, msg);
    })
  },
  executeProject: (req, res) => {
    const {query} = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model.checkOngoingProject(decoded['id']).then(response => {
        if (response[0].ongoing >= 2) {
          const msg = 'failed';
          form.success(res, response, msg);
        } else {
            console.log(query)
          if (query.is_accept == '1') {
            model
              .executeRequest(query, decoded['id'])
              .then(response => {
                model
                  .deleteRequest(query)
                  .then(result => {
                    const msg = "success";
                    form.success(res, response, msg);
                  })
              })
          } else {
            model
              .executeRequest(query, decoded['id'])
              .then(response => {
                const msg = "success";
                form.success(res, response, msg);
              })
          }
        }
      })
  }
}