const db = require('../models');

const createEvent = async (eventId, projectId, eventName, startDate, endDate) => {
  const result = await db.project_events.create({
    event_id: eventId,
    project_id: projectId,
    event_name: eventName,
    start_date: startDate,
    end_date: endDate,
  });
  return result;
};

const deleteEvent = async (id) => {
  const result = await db.project_events.destroy({
    where: {
      event_id: id
    }
  });
  return result;
};

const getEvents = async (projectId) => {
  const result = await db.project_events.findAll({
    where: {
      project_id: projectId
    }
  });
  return result;
};

module.exports = { createEvent, deleteEvent, getEvents };