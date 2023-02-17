const leaveService = require('../services/leave');

const createLeave = async (req, res) => {
  try {
    const { username, startDate, endDate } = req.body;
    const newLeave = await leaveService.createLeave(
      username,
      startDate,
      endDate,
    );
    return res.status(201).json({
      status: 201,
      data: newLeave,
      message: 'Succesfully Created Leave',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}; 

const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await leaveService.deleteLeave(id);
    if (deleted[0] === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Leave Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: deleted,
      message: 'Succesfully Deleted Leave',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const newLeave = req.body;
    const updated = await leaveService.updateLeave(id, newLeave);
    if (updated[0] === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Leave Not Found',
      });
    }
    return res.status(200).json({ 
      status: 200,
      data: updated[1],
      message: 'Succesfully Updated Leave',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const getLeaves = async (req, res) => {
  try {
    const { username } = req.params;
    const leaves = await leaveService.getLeaves(username);
    if (leaves.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Leaves Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: leaves,
      message: 'Succesfully Retrieved Leaves',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = { createLeave, deleteLeave, getLeaves, updateLeave }; 
