// addMember, getTeam  getTeamByProjectId, getTeamByUserName, getTeamByRole
const httpErrors = require('../../errors/httpErrors');
const teamService = require('../services/teamServices');
const addMember = async (req, res) => {
  try {
    const { project_id, username, emp_role, emp_status } = req.body;
    console.log(project_id, username, emp_role, emp_status);
    const teamMember = await teamService.addMember(project_id, username, emp_role, emp_status);
    res.status(201).json(teamMember);
  }
  catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const getTeam = async (req, res) => {
  try {
    const { project_id, key, value } = req.body;
    const team = await teamService.getTeam(project_id, key, value);
    res.status(200).json(team);
  }
  catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = { addMember, getTeam };