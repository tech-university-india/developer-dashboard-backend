
const Router = require('express').Router();
const { getUsers, checkAuth } = require('../controllers/dashController');
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/admin_access');

Router.get('/users', getUsers);
Router.route('/users/create').post(isAdmin, adminController.createUser);
Router.post('/users/auth', checkAuth);

module.exports = Router;
