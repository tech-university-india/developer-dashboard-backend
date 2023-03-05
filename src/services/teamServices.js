const db = require('../models/index');

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

const updateMember = async (project_id, team_members) => {
  team_members.map((member) => {
    db.teams.update(member, { where: { project_id: project_id, username: member.username } });
  });
  const updatedMembers = await db.teams.findAll({ where: { project_id: project_id } });
  return updatedMembers;
};

module.exports = { addMember, getTeam, updateMember };