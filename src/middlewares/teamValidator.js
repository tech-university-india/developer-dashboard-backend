const joi = require('joi');

const teamSchema = joi.object({
  project_id: joi.string().required(),
  adder_role: joi.string().valid('manager', 'supermanager').required(),
  emp_role: joi.string().required(),
  username: joi.string().required()
});

const requestSchema = joi.object({
  project_id: joi.string().required(),
  key: joi.string().valid('username', 'emp_status', 'role', 'all').required(),
  value: joi.when('key', {
    is: 'emp_status',
    then: joi.string().valid('rolled off', 'active').required(),
    otherwise: joi.when('key', {
      is: 'role',
      then: joi.string().valid('developer', 'manager', 'supermanager').required(),
      otherwise: joi.when('key', {
        is: 'all',
        then: joi.any().required(),
        otherwise: joi.string().required()
      })
    })
  }),
});

const patchSchema = joi.object({
  project_id: joi.string().required(),
  username: joi.string().required(),
  emp_role: joi.alternatives().try(joi.string().valid('developer', 'manager', 'supermanager')),
  emp_status: joi.alternatives().try(joi.string().valid('rolled off', 'active'))
}).or('emp_role', 'emp_status');

const teamValidator = (req, res, next) => {
  const { error } = teamSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

const getTeamValidator = (req, res, next) => {
  const { error } = requestSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

const patchValidator = (req, res, next) => {
  const { error } = patchSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }

};

module.exports = { teamValidator, getTeamValidator, patchValidator };



