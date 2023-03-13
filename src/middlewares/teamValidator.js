const joi = require('joi');

const postTeamSchema = joi.array().items(
  joi.object({
    username: joi.string().required(),
    role: joi.string().required(),
    key_status: joi.boolean().required(),
    start_date: joi.date().required(),
    end_date: joi.date().required(),
    cost: joi.number().required(),
  })
);

const patchTeamSchema = joi.array().items(
  joi.object({
    username: joi.string().required(),
    role: joi.string(),
    key_status: joi.boolean(),
    start_date: joi.date(),
    end_date: joi.date(),
    cost: joi.number()
  }).required()
);

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

module.exports = { teamValidator, patchValidator };



