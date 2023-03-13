const Router = require('express').Router();

const { addMember, getTeam, updateMember } = require('../controllers/teamController');
<<<<<<< HEAD
const { teamValidator, patchValidator } = require('../middlewares/teamValidator');

Router.post('', teamValidator, addMember);
Router.get('', getTeam);
=======
const { teamValidator, getTeamValidator, patchValidator } = require('../middlewares/teamValidator');

Router.post('', teamValidator, addMember);
Router.get('', getTeamValidator, getTeam);
>>>>>>> abd58cc1cdbb16d2680a8e47351fac6ebe509c9a
Router.patch('', patchValidator, updateMember);

module.exports = Router;