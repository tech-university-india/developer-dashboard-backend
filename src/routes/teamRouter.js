const Router = require('express').Router();

const { addMember, getTeam, updateMember } = require('../controllers/teamController');
const { teamValidator, patchValidator } = require('../middlewares/teamValidator');

Router.post('', teamValidator, addMember);
Router.get('', getTeam);
Router.patch('', patchValidator, updateMember);

module.exports = Router;