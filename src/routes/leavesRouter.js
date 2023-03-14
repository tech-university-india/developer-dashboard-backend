const Router = require('express').Router();
const leaveController = require('../controllers/leaveController');

Router.post('/', leaveController.createLeave);
Router.patch('/:id', leaveController.updateLeave);
Router.delete('/:id', leaveController.deleteLeave);
Router.get('/:projectId', leaveController.getLeavesByProjectId);

module.exports = Router;
