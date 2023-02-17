const Router = require('express').Router();
const adminController = require('../controllers/adminController');

Router.route('/users')
  .post(adminController.createUser)
  .get(adminController.getUsers)
  .put(adminController.updateUser);

module.exports = Router;  