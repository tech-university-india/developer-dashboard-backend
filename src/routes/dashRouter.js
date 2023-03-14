
const Router = require('express').Router();
const { checkAuth } = require('../controllers/dashController');

Router.post('/users/auth', checkAuth);

module.exports = Router;
