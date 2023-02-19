const db = require('../models/index');
const httpErrors = require('../../errors/httpErrors');
const { v4: uuidv4 } = require('uuid');


const createSurvey = async (surveyName, project_id, frequency) => {
  const projectValidated = await db.project_details.findOne({ where: { project_id: project_id } });
  if (!projectValidated) {
    throw new httpErrors('Invalid project id', 400);
  }
  // eslint-disable-next-line no-unused-vars
  const updatedSurvey = await db.survey.update({ status: 'inactive' }, { where: { project_id: project_id } });
  const status = 'active';
  const survey = await db.survey.create({
    survey_name: surveyName,
    survey_id: (project_id + '_' + new Date().getTime()),
    project_id: project_id,
    frequency: frequency,
    status: status
  });
  return survey;
};

const getSurveys = async (project_id) => {
  const projectValidated = await db.project_details.findOne({ where: { project_id: project_id } });
  if (!projectValidated) {
    throw new httpErrors('Invalid project id', 400);
  }
  const surveys = await db.survey.findAll({ where: { project_id: project_id } });
  return surveys;
};

const postQuestions = async (survey_id, questions) => {
  const surveyValidated = await db.survey.findOne({ where: { survey_id: survey_id } });
  if (!surveyValidated) {
    throw new httpErrors('Invalid survey id', 400);
  }
  if (surveyValidated.status === 'inactive') {
    throw new httpErrors('Survey is inactive', 400);
  }
  questions.map(async (question) => {
    question['survey_id'] = survey_id;
    question['question_id'] = uuidv4();
  });
  const questionsCreated = await db.survey_questions.bulkCreate(questions);
  return questionsCreated;
};

const getQuestions = async (survey_id) => {
  const surveyValidated = await db.survey.findOne({ where: { survey_id: survey_id } });
  if (!surveyValidated) {
    throw new httpErrors('Invalid survey id', 400);
  }
  const questions = await db.survey_questions.findAll({ where: { survey_id: survey_id } });
  return questions;
};

module.exports = { createSurvey, getSurveys, postQuestions, getQuestions };