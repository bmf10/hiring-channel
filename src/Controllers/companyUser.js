const jwtdecode = require('jwt-decode');
const model = require('../Models/companyUser');
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
  postProject: (req, res) => {
    const {body} = req;

    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);

    model
      .postProject(body, decoded['id'])
      .then(response => {
        const data = {
          id: response.insertId,
          project_name: body.project_name
        }
        const msg = 'success';
        form.success(res, data, msg);
      })
      .catch(err => console.log(err));
  },
  getProject: (req, res) => {
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .getProject(decoded['id'])
      .then(response => {
        const msg = 'success';
        form.success(res, response, msg)
      })
      .catch(err => console.log(err));
  },
  deleteProject: (req, res) => {
    const {params} = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .deleteProject(params.projectId, decoded['id'])
      .then(response => {
        const data = {
          description: response
        };
        const msg = response;
        form.success(res, data, msg)
      })
      .catch(err => console.log(err))
  },
  getAvailableProject: (req, res) => {
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .getAvailableProject(decoded['id'])
      .then(response => {
        const msg = "success";
        form.success(res, response, msg)
      })
      .catch(err => console.log(err))
  },
  postRequestProject: (req, res)=>{
    const {
      body
    } = req;

    model.postRequestProject(body).then(response=>{
      const msg = "success";
        form.success(res, response, msg)
    }).catch(err => console.log(err))
  },
  finishProject:(req, res)=>{
    const{
      query
    } = req;

    model.finishProject(query).then(response=>{
      const msg = "success";
      form.success(res, response, msg)
    }).catch(err => console.log(err))
  }
}