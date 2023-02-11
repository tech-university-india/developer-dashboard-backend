const db = require('../models');

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

module.exports = { createLeave, deleteLeave, getLeaves};