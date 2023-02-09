const eventService = require("../services/event.js");

const createEvent = async (req, res) => {
  try {
    const { eventId, projectId, eventName, startDate, endDate } = req.body;
    const newEvent = await eventService.createEvent(eventId, projectId, eventName, startDate, endDate);
    return res.status(201).json({
      status: 201,
      data: newEvent,
      message: "Succesfully Created Event",
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};
module.exports = { createEvent };