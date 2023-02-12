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

const getLeaves = async (username) => {
  const result = await db.user_leaves.findAll({
    where: {
      username: username,
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


module.exports = { createLeave, deleteLeave, getLeaves, updateLeave };