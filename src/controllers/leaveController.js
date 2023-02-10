const leaveService = require("../services/leave");

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
      message: "Succesfully Created Leave",
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}; 

const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await leaveService.deleteLeave(id);
    return res.status(200).json({
      status: 200,
      data: deleted,
      message: "Succesfully Deleted Leave",
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};



module.exports = { createLeave, deleteLeave }; 
