const db = require('../models/index');
const httpErrors = require('../../errors/httpErrors');

const addMember = async (project_id, username, role) => {

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
    emp_status: 'active'
  });
  return teamMember;
};

const getTeam = async (project_id, key, value) => {
  const validProject = await db.project_details.findOne({ where: { project_id: project_id } });
  if (!validProject) {
    throw new httpErrors('Invalid project id', 400);
  }
  let team;
  if (key === 'emp_status') {
    team = await db.teams.findAll({ where: { project_id: project_id, emp_status: value } });
    if (!team) {
      throw new httpErrors('No employee with this status', 400);
    }
  } else if (key === 'role') {
    team = await db.teams.findAll({ where: { project_id: project_id, role: value } });
    if (!team) {
      throw new httpErrors('No employee with this role', 400);
    }
  } else if (key === 'all') {
    team = await db.teams.findAll({ where: { project_id: project_id } });
    if (!team) {
      throw new httpErrors('No employee in this project', 400);
    }
  } else {
    team = await db.teams.findOne({ where: { project_id: project_id, username: value } });
    if (!team) {
      throw new httpErrors('No employee with this username', 400);
    }
  }
  return team;
};

const updateMember = async (project_id, username, role, status) => {
  const validProject = await db.project_details.findOne({ where: { project_id: project_id } });
  if (!validProject) {
    throw new httpErrors('Invalid project id', 400);
  }
  const validUser = await db.user.findOne({ where: { username: username } });
  if (!validUser) {
    throw new httpErrors('Invalid username', 400);
  }
  const validTeam = await db.teams.findOne({ where: { project_id: project_id, username: username } });
  if (!validTeam) {
    throw new httpErrors('No such member in this project', 400);
  }
  if (role && status) {
    const user = await db.teams.update({ role: role, emp_status: status }, { where: { project_id: project_id, username: username } });
    return user;
  } else if (role) {
    const user = await db.teams.update({ role: role }, { where: { project_id: project_id, username: username } });
    return user;
  } else {
    const user = await db.teams.update({ emp_status: status }, { where: { project_id: project_id, username: username } });
    return user;
  }
};

module.exports = { addMember, getTeam, updateMember };