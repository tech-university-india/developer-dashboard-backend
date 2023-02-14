
const Router = require('express').Router();
const { getUsers, checkAuth } = require('../controllers/dashboard');
const adminController = require('../controllers/admin');
const { isAdmin } = require('../middleware/admin_access');
const validationMiddleware = require('../middlewares/admin');

Router.get('/users', getUsers);
Router.route('/users/create')
  .post(isAdmin, validationMiddleware.validateUser, adminController.createUser)
  .put(validationMiddleware.validateUserUpdate, adminController);
Router.post('/users/auth', checkAuth);

module.exports = Router;
