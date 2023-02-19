const joi = require('joi');

const createSurveySchema = joi.object({
  survey_name: joi.string().required(),
  project_id: joi.number().required(),
  frequency: joi.number().required()
});

const getSurveysSchema = joi.object({
  project_id: joi.string().required()
});

const getSurveyQuestionsSchema = joi.object({
  project_id: joi.string().required(),
  survey_id: joi.string().required()
});

//write a schema for postResponses when body is array of objects and object have question_id,rating,description
const responseSchema = joi.object({
  username: joi.string().required(),
  responses: joi.array().items(joi.object({
    question_id: joi.string().required(),
    rating: joi.number().required(),
    description: joi.string().required(),
  })).required(),
});


//write a schema for postQuestions when body is array of objects
const postQuestionsSchema = joi.object({
  survey_id: joi.string().required(),
  questions: joi.array().items(joi.object({
    question_name: joi.string().required(),
    min_rating: joi.number().required(),
    max_rating: joi.number().required(),
  })).required(),
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

const postQuestionsValidator = (req, res, next) => {
  const { error } = postQuestionsSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

const getSurveyQuestionsValidator = (req, res, next) => {
  const { error } = getSurveyQuestionsSchema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

const responseValidator = (req, res, next) => {
  const { error } = responseSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = { createSurveyValidator, getSurveysValidator, postQuestionsValidator, getSurveyQuestionsValidator, responseValidator };