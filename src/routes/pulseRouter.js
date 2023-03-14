const Router = require('express').Router();
const { addPulse, getPulse } = require('../controllers/pulseController');
const { addPulseValidator, getPulseValidator } = require('../middlewares/pulseValidator');

Router.get('/add', addPulseValidator, addPulse);
Router.get('', getPulseValidator, getPulse);

module.exports = Router;