const express = require('express');
const controller = require('../Controllers/engineer');

const Router = express.Router();

Router.get('/', controller.getAllEngineer);

Router.post('/', controller.postEngineer);
Router.post('/:id/skill', controller.postSkill);
Router.post('/:id/showcase', controller.postShowcase);

Router.patch('/:id', controller.patchEngineer);
Router.patch('/:engineerId/skill/:skillId', controller.patchSkill);
Router.patch('/:engineerId/showcase/:shocaseId', controller.patchShowcase);

Router.delete('/:id', controller.deleteEngineer);
Router.delete('/:engineerId/skill/:skillId', controller.deleteSkill);
Router.delete('/:engineerId/showcase/:skillId', controller.deleteShowcase);

module.exports = Router;