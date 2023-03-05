const httpErrors = require('../../errors/httpErrors');
const db = require('../models/index');

const addPulse = async (project_id, username, pulse) => {
  const pulseReported = await db.pulse.findOne({ where: { project_id: project_id, username: username } });
  if (pulseReported) {
    const pulse_date = new Date(pulseReported.createdAt);
    const today = new Date();
    if (pulse_date.getMonth() === today.getMonth()) {
      throw new httpErrors('Pulse already reported for this month', 400);
    }
  }
  const pulseData = await db.pulse.create({ project_id: project_id, username: username, pulse: pulse });
  return pulseData;
};

const getPulse = async (project_id) => {
  const pulse = await db.pulse.findAll({ where: { project_id: project_id } });
  return pulse;
};

module.exports = { addPulse, getPulse };


