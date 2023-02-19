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

const getQuestions = async (project_id, survey_id) => {
  console.log(project_id, survey_id);
  const projectValidated = await db.project_details.findOne({ where: { project_id: project_id } });
  if (!projectValidated)
    throw new httpErrors('Invalid project id', 400);

  if (survey_id === 'all') {
    const surveys = await db.survey.findAll({ where: { project_id: project_id } });
    if (!surveys)
      throw new httpErrors('No surveys found', 400);
    const survey_ids = surveys.map((survey) => survey.survey_id);
    const questions = await db.survey_questions.findAll({ where: { survey_id: survey_ids } });
    return questions;
  }
  else if (survey_id === 'latest') {
    const latestSurvey = await db.survey.findOne({ where: { project_id: project_id, status: 'active' } });
    if (!latestSurvey)
      throw new httpErrors('No active survey found', 400);
    const questions = await db.survey_questions.findAll({ where: { survey_id: latestSurvey.survey_id } });
    return questions;
  } else {
    const surveyValidated = await db.survey.findOne({ where: { survey_id: survey_id } });
    if (!surveyValidated)
      throw new httpErrors('Invalid survey id', 400);
    const questions = await db.survey_questions.findAll({ where: { survey_id: survey_id } });
    return questions;
  }
};

const postResponses = async (username, responses) => {
  responses.map(async (response) => {
    response['username'] = username;
    response['date'] = new Date();
  });
  const questions = responses.map((response) => response.question_id);

  const alreadyResponded = await db.survey_responses.findOne({ where: { username: username, question_id: questions } });
  if (alreadyResponded) {
    throw new httpErrors('Already submitted this survey', 400);
  }
  const responsesCreated = await db.survey_responses.bulkCreate(responses);
  return responsesCreated;
};
module.exports = { createSurvey, getSurveys, postQuestions, getQuestions, postResponses };