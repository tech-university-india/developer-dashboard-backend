const httpErrors = require('../../errors/httpErrors');
const { pulse_score, teams } = require('../models/index');
const { getPulseMap } = require('../utils/pulseMapper');

const addPulse = async (project_id, username, pulse) => {
  const pulseReported = await pulse_score.findOne({ where: { project_id: project_id, username: username } });
  if (pulseReported) {
    const pulse_date = new Date(pulseReported.dataValues.createdAt);
    const today = new Date();
    if (pulse_date.getMonth() === today.getMonth()) {
      throw new httpErrors('Pulse already reported for this month', 400);
    }
  }
  await pulse_score.create({ project_id: project_id, username: username, score: pulse });
  return { message: 'Pulse reported successfully' };
};

const getPulse = async (viewer) => {
  const x_axis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const projects = await teams.findAll({ where: { username: viewer }, attributes: ['project_id'] });
  let y_axis;
  if (!projects || projects.length === 0) {
    y_axis = getPulseMap([]);
  } else {
    let pulse = await pulse_score.findAll({ where: { project_id: projects[0].dataValues.project_id }, attributes: ['score', 'createdAt'] });
    y_axis = getPulseMap(pulse);
  }
  return { x_axis, y_axis };
};

module.exports = { addPulse, getPulse };


