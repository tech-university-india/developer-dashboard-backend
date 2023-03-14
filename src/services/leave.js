const db = require('../models');
const caseMap = require('../../src/utils/caseMapper.js');

const createLeave = async (username,startDate, endDate) => {
  const result = await db.user_leaves.create({
    username: username,
    start_date: startDate,
    end_date: endDate,
  });
  return result;
};

const deleteLeave = async (id) => {
  const result = await db.user_leaves.destroy({
    where: {
      id: id,
    },
  });
  return result;
};

const updateLeave = async (id, leave) => {
  Object.keys(leave).forEach((key) => {
    leave[caseMap[key]] = leave[key];
    delete leave[key];
  });

  const result = await db.user_leaves.update(leave, {
    where: {
      id: id,
    },
    returning: true,
  });
  return result;
};

const getLeavesByProjectId = async (projectId) => {
  // prevent sql injection
  const results = await db.sequelize.query(
    'SELECT * FROM user_leaves WHERE username IN (SELECT username FROM teams WHERE project_id = ?)',
    {
      replacements: [projectId],
    },
  );
  
  return results[0];
};


module.exports = { createLeave, deleteLeave, updateLeave, getLeavesByProjectId };