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
module.exports = { createLeave }; 
