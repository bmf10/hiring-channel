const model = require('../Models/engineer');
const form = require('../Helpers/form');
const validation = require('../Models/validation');

module.exports = {
  getAllEngineer: (req, res) => {
    const {query} = req;

    model
      .getAllEngineer(query)
      .then(response => {
        page = parseInt(response[2]);
        limit = parseInt(response[1]);
        dataAmount = response[3];

        totalPage = Math.ceil(dataAmount / limit);
        nextPage = totalPage - page;
        prevPage = (totalPage - 1) - nextPage;

        paginate = {
          "totalPage": totalPage,
          "per_page": limit,
          "page": page,
          "total": dataAmount,
          "next": nextPage,
          "prev": prevPage
        }

        data = response[0];
        const msg = 'success';
        form.success(res, data, msg, paginate);
      })
      .catch(err => {
        console.log(err);
      })
  },
  postEngineer: (req, res) => {
    const {body} = req;
    username = body.username;
    password = body.password;

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
                    .postEngineer(body)
                    .then(response => {
                      const data = {
                        id: response.insertId,
                        name: body.name,
                        description: body.description,
                        location: body.location,
                        date_of_birth: body.date_of_birth,
                        date_created: body.date_created,
                        username: body.username
                      };
                      const msg = 'success'
                      form.success(res, data, msg);
                    })
                    .catch(err => console.log(err));
                }
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err))
    }

  },
  postSkill: (req, res) => {
    const {params, body} = req;
    model
      .postSkill(body, params)
      .then(response => {
        const data = {
          id: response.insertId,
          skill_name: body.skill_name,
          level: body.level,
          id_engineer: params.id
        }
        const msg = 'success';
        form.success(res, data, msg);
      })
      .catch(err => console.log(err));
  },
  postShowcase: (req, res) => {
    const {params, body} = req;
    model
      .postShowcase(body, params)
      .then(response => {
        const data = {
          id: response.insertId,
          skill_name: body.showcase_name,
          year: body.year,
          level: body.level,
          id_engineer: params.id
        }
        const msg = 'success';
        form.success(res, data, msg);
      })
      .catch(err => console.log(err));
  },
  patchEngineer: (req, res) => {
    const {params, query} = req;

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

    pattern = new RegExp(/^[a-z0-9]+$/); //alphanum
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
                    .patchEngineer(query, params)
                    .then(response => {
                      const data = query;
                      const msg = 'success';
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
  deleteEngineer: (req, res) => {
    const {params} = req;
    model
      .deleteEngineer(params)
      .then(response => {
        const data = {
          description: "Deleted"
        };
        const msg = 'success';
        form.success(res, data, msg)
      })
      .catch(err => console.log(err));
  },
  patchSkill: (req, res) => {
    const {params, query} = req;
    model
      .patchSkill(params, query)
      .then(response => {
        const data = query;
        const msg = 'success';
        form.success(res, data, msg);
      })
      .catch(err => console.log(err))
  },
  patchShowcase: (req, res) => {
    const {params, query} = req;
    model
      .patchShowcase(params, query)
      .then(response => {
        const data = query;
        const msg = 'success';
        form.success(res, data, msg);
      })
      .catch(err => console.log(err))
  },
  deleteSkill: (req, res) => {
    const {params} = req;
    model
      .deleteSkill(params)
      .then(response => {
        const data = {
          description: "Deleted"
        };
        const msg = 'success';
        form.success(res, data, msg)
      })
      .catch(err => console.log(err));
  },
  deleteShowcase: (req, res) => {
    const {params} = req;
    model
      .deleteShowcase(params)
      .then(response => {
        const data = {
          description: "Deleted"
        };
        const msg = 'success';
        form.success(res, data, msg)
      })
      .catch(err => console.log(err));
  },
  getResultSearch: (req, res) => {
    const {query} = req;
    model
      .getResultSearch(query)
      .then(response => {
        const msg = 'success';
        form.success(res, response, msg);
      })
      .catch(err => console.log(err));
  },
  getById: (req, res) => {
    const {params} = req;
    model
      .getById(params)
      .then(response => {
        const msg = 'success';
        form.success(res, response, msg)
      })
      .catch(err => console.log(err))
  }

}