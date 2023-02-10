const eventService = require("../services/event.js");

const createEvent = async (req, res) => {
  try {
    const { eventId, projectId, eventName, startDate, endDate } = req.body;
    const newEvent = await eventService.createEvent(
      eventId, 
      projectId, 
      eventName, 
      startDate, 
      endDate
    );
    return res.status(201).json({
      status: 201,
      data: newEvent,
      message: "Succesfully Created Event",
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const { projectId } = req.params;
    const events = await eventService.getEvents(projectId);
    return res.status(200).json({ 
      status: 200, 
      data: events, 
      message: "Succesfully Events Recieved" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await eventService.deleteEvent(id);
    return res.status(200).json({
      status: 200,
      data: deleted,
      message: "Succesfully Deleted Event",
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = { createEvent, deleteEvent, getEvents};