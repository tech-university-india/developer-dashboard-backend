const joi = require('joi');

const addPulseSchema = joi.object({
  project_id: joi.string().required(),
  username: joi.string().required(),
  pulse: joi.number().required(),
});

const getPulseSchema = joi.object({
  project_id: joi.string().required()
});

const addPulseValidator = (req, res, next) => {
  const { error } = addPulseSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const getPulseValidator = (req, res, next) => {
  const { error } = getPulseSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { addPulseValidator, getPulseValidator };