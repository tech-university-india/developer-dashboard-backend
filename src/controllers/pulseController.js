const httpErrors = require('../../errors/httpErrors');
const pulseService = require('../services/pulseServices');
const addPulse = async (req, res) => {
  try {
    const { project_id, username, pulse } = req.query;
    const pulseData = await pulseService.addPulse(project_id, username, pulse);
    res.status(201).json(pulseData);
  }
  catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const getPulse = async (req, res) => {
  try {
    const { viewer } = req.query;
    const pulse = await pulseService.getPulse(viewer);
    res.status(200).json(pulse);
  }
  catch (err) {
    // console.log(err);
    if (err instanceof httpErrors) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};



module.exports = { addPulse, getPulse };