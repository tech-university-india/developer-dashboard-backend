const db = require('../models/index');
const httpErrors = require('../../errors/httpErrors');

const addMember = async (project_id, username, role, emp_status) => {

  const validMember = await db.user.findOne({ where: { username: username } });
  if (!validMember) {
    throw new httpErrors('Invalid username', 400);
  }
  const projectValidated = await db.project_details.findOne({ where: { project_id: project_id } });
  if (!projectValidated) {
    throw new httpErrors('Invalid project id', 400);
  }

  const alreadyMember = await db.teams.findOne({ where: { username: username, project_id: project_id } });
  if (alreadyMember) {
    throw new httpErrors('User already a member of this project', 400);
  }
  const teamMember = await db.teams.create({
    project_id: project_id,
    emp_name: 'Balkar',
    username: username,
    role: role,
    emp_status: emp_status
  });
  return teamMember;
};

const getTeam = async (project_id) => {
  const validProject = await db.project_details.findOne({ where: { project_id: project_id } });
  if (!validProject) {
    throw new httpErrors('Invalid project id', 400);
  }
  const team = await db.teams.findAll({ where: { project_id: project_id } });
  if (!team) {
    throw new httpErrors('No team members found', 400);
  }
  return team;
};

module.exports = { addMember, getTeam };