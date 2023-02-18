const Router = require('express').Router();

const { addMember, getTeam, updateMember } = require('../controllers/teamController');
const { teamValidator, getTeamValidator, patchValidator } = require('../middlewares/teamValidator');

Router.post('', teamValidator, addMember);
Router.get('', getTeamValidator, getTeam);
Router.patch('', patchValidator, updateMember);

module.exports = Router;