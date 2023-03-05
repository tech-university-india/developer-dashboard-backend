const Router = require('express').Router();
const { addPulse, getPulse } = require('../controllers/pulseController');
const { addPulseValidator, getPulseValidator } = require('../middlewares/pulseValidator');

Router.post('', addPulseValidator, addPulse);
Router.get('', getPulseValidator, getPulse);

module.exports = Router;