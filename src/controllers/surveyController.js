const httpErrors = require('../../errors/httpErrors');
const surveyService = require('../services/surveyServices');

const createSurvey = async (req, res) => {
  try {
    const { survey_name, project_id, frequency } = req.body;
    const survey = await surveyService.createSurvey(survey_name, project_id, frequency);
    res.status(201).json(survey);
  }
  catch (err) {
    console.log(err);
    if (err instanceof httpErrors) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const getSurveys = async (req, res) => {
  try {
    const { project_id } = req.query;
    const surveys = await surveyService.getSurveys(project_id);
    res.status(200).json(surveys);
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

const postQuestions = async (req, res) => {
  try {
    const { survey_id, questions } = req.body;
    const survey = await surveyService.postQuestions(survey_id, questions);
    res.status(201).json(survey);
  }
  catch (err) {
    console.log(err);
    if (err instanceof httpErrors) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const getSurveyQuestions = async (req, res) => {
  try {
    const { project_id, survey_id } = req.query;
    const questions = await surveyService.getQuestions(project_id, survey_id);
    res.status(200).json(questions);
  }
  catch (err) {
    console.log(err);
    if (err instanceof httpErrors) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = { createSurvey, getSurveys, postQuestions, getSurveyQuestions };