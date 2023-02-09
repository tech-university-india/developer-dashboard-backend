const db = require("../models");

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

module.exports = { createEvent };