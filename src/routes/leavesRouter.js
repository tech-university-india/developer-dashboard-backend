const Router = require('express').Router();
const leaveController = require('../controllers/leaveController');

Router.post('/', leaveController.createLeave);
Router.get('/:username', leaveController.getLeaves);
Router.patch('/:id', leaveController.updateLeave);
Router.delete('/:id', leaveController.deleteLeave);

module.exports = Router;
