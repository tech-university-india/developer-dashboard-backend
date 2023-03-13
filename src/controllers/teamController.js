// addMember, getTeam  getTeamByProjectId, getTeamByUserName, getTeamByRole
const httpErrors = require('../../errors/httpErrors');
const teamService = require('../services/teamServices');
const addMember = async (req, res) => {
  try {
    const { project_id } = req.query;
    const { team_members } = req.body;
    const savedTeamMembers = await teamService.addMember(project_id, team_members);
    res.status(201).json(savedTeamMembers);
  }
  catch (err) {
    // console.log(err);
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
    const { project_id } = req.query;
    const team = await teamService.getTeam(project_id);
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

const updateMember = async (req, res) => {
  try {
    const { project_id } = req.query;
    const { team_members } = req.body;
    const updatedMembers = await teamService.updateMember(project_id, team_members);
    res.status(200).json(updatedMembers);
  }
  catch (err) {
    console.log(err);
    if (err instanceof httpErrors) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


module.exports = { addMember, getTeam, updateMember };