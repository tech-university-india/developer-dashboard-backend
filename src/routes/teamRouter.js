const Router = require('express').Router();

const { addMember, getTeam } = require('../controllers/teamController');
const { teamValidator, getTeamValidator } = require('../middlewares/teamValidator');

Router.post('', teamValidator, addMember);
Router.get('', getTeamValidator, getTeam);

module.exports = Router;