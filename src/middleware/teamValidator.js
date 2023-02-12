const joi = require('joi');

const teamSchema = joi.object({
  project_id: joi.string().required(),
  status: joi.string().valid('rolled off', 'active').required(),
  adder_role: joi.string().valid('manager', 'supermanager').required(),
  emp_role: joi.string().required(),
  username: joi.string().required()
});

const projectSchema = joi.object({
  project_id: joi.string().required()
});

const teamValidator = (req, res, next) => {
  const { error } = teamSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

const projectValidator = (req, res, next) => {
  const { error } = projectSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = { teamValidator, projectValidator };



