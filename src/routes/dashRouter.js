
const Router = require('express').Router();
const { checkAuth } = require('../controllers/dashController');

const { addMember, getTeam } = require('../controllers/teamController');
const { teamValidator, getTeamValidator } = require('../middlewares/teamValidator');

Router.post('/users/auth', checkAuth);
Router.post('/teams/create', teamValidator, addMember);
Router.get('/teams', getTeamValidator, getTeam);

module.exports = Router;
