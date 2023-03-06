const httpErrors = require('../../errors/httpErrors');
const db = require('../models/index');
const { getPulseMap } = require('../utils/pulseMapper');

const addPulse = async (project_id, username, pulse) => {
  const pulseReported = await db.pulse.findAll({ where: { project_id: project_id, username: username } });
  if (pulseReported) {
    const pulse_date = new Date(pulseReported.createdAt);
    const today = new Date();
    if (pulse_date.getMonth() === today.getMonth()) {
      throw new httpErrors('Pulse already reported for this month', 400);
    }
  }
  await db.pulse.create({ project_id: project_id, username: username, pulse: pulse });
  return { message: 'Pulse reported successfully' };
};

const getPulse = async (viewer) => {
  // const projects = await db.teams.findAll({ where: { username: viewer }, attributes: ['project_id'] });
  // let pulse = await db.pulse.findAll({ where: { project_id: projects }, attributes: ['pulse', 'createdAt'] });
  const x_axis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // const y_axis = getPulseMap(pulse);
  const y_axis = [{
    name: 'Terrible',
    data: [
      4, 3, 1, 3, 1,
      1, 1, 2, 0, 0,
      0, 0
    ]
  },
  {
    name: 'Ok',
    data: [
      0, 3, 1, 1, 1,
      1, 0, 0, 1, 0,
      0, 0
    ]
  },
  {
    name: 'Good',
    data: [
      0, 1, 3, 0, 2,
      1, 1, 0, 0, 0,
      0, 0
    ]
  }
  ];
  return { x_axis, y_axis, title: 'Pulse Check', y: 'Responses', x: 'Month', colors: ['#FF0000', '#FFA500', '#008000'] };
};


module.exports = { addPulse, getPulse };


