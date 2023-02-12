
const Router = require('express').Router();
const { getUsers, checkAuth } = require('../controllers/dashController');
const adminController = require('../controllers/adminController');
const { addMember, getTeam } = require('../controllers/teamController');
const { isAdmin } = require('../middleware/admin_access');
const { teamValidator, getTeamValidator } = require('../middleware/teamValidator');

Router.get('/users', getUsers);
Router.route('/users/create').post(isAdmin, adminController.createUser);
Router.post('/users/auth', checkAuth);

Router.post('/teams/create', teamValidator, addMember);
Router.get('/teams', getTeamValidator, getTeam);
module.exports = Router;
