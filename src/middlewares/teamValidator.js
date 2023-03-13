const joi = require('joi');

<<<<<<< HEAD
const postTeamSchema = joi.array().items(
  joi.object({
    username: joi.string().required(),
    role: joi.string().required(),
    key_member: joi.boolean().required(),
    start_date: joi.date().required(),
    end_date: joi.date().required(),
    cost: joi.number().required(),
  })
);
=======
const teamSchema = joi.object({
  project_id: joi.string().required(),
  adder_role: joi.string().valid('manager', 'supermanager').required(),
  emp_role: joi.string().required(),
  username: joi.string().required()
});
>>>>>>> abd58cc1cdbb16d2680a8e47351fac6ebe509c9a

const patchTeamSchema = joi.array().items(
  joi.object({
    username: joi.string().required(),
    role: joi.string(),
    key_member: joi.boolean(),
    start_date: joi.date(),
    end_date: joi.date(),
    cost: joi.number()
  }).required()
);

const patchSchema = joi.object({
  project_id: joi.string().required(),
  username: joi.string().required(),
  emp_role: joi.alternatives().try(joi.string().valid('developer', 'manager', 'supermanager')),
  emp_status: joi.alternatives().try(joi.string().valid('rolled off', 'active'))
}).or('emp_role', 'emp_status');

const teamValidator = (req, res, next) => {
  const { error } = postTeamSchema.validate(req.body.team_members);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};
const patchValidator = (req, res, next) => {
  const { error } = patchTeamSchema.validate(req.body.team_members);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }

};

<<<<<<< HEAD
module.exports = { teamValidator, patchValidator };
=======
const patchValidator = (req, res, next) => {
  const { error } = patchSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }

};

module.exports = { teamValidator, getTeamValidator, patchValidator };
>>>>>>> abd58cc1cdbb16d2680a8e47351fac6ebe509c9a



