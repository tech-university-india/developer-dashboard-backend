const Router = require('express').Router();
const eventController = require('../controllers/eventController');

Router.post('/', eventController.createEvent);
Router.get('/:projectId', eventController.getEvents);
Router.patch('/:id', eventController.updateEvent);
Router.delete('/:id', eventController.deleteEvent);

module.exports = Router;
