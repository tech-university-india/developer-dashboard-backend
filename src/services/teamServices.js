const db = require('../models/index');
const httpErrors = require('../../errors/httpErrors');

const addMember = async (project_id, members) => {
  let team_members = members.map(member => {
    member.project_id = project_id;
  });
  const storedMembers = await db.teams.bulkCreate(team_members);
  return storedMembers;
};

const getTeam = async (project_id) => {
  const teams = await db.teams.findAll({ where: { project_id: project_id } });
  return teams;
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