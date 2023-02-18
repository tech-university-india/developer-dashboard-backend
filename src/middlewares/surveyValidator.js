const joi = require('joi');

const createSurveySchema = joi.object({
  survey_name: joi.string().required(),
  project_id: joi.number().required(),
  frequency: joi.number().required()
});

const getSurveysSchema = joi.object({
  project_id: joi.number().required()
});

const createSurveyValidator = (req, res, next) => {
  const { error } = createSurveySchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

const getSurveysValidator = (req, res, next) => {
  const { error } = getSurveysSchema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = { createSurveyValidator, getSurveysValidator };