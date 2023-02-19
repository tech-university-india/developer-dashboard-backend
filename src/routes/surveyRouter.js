const router = require('express').Router();
const { createSurvey, getSurveys, postQuestions, getSurveyQuestions, postResponses } = require('../controllers/surveyController');
const { createSurveyValidator, getSurveysValidator, postQuestionsValidator, getSurveyQuestionsValidator, responseValidator } = require('../middlewares/surveyValidator');

router.post('', createSurveyValidator, createSurvey);
router.get('', getSurveysValidator, getSurveys);
router.post('/questions', postQuestionsValidator, postQuestions);
router.get('/questions', getSurveyQuestionsValidator, getSurveyQuestions);
router.post('/responses', responseValidator, postResponses);

module.exports = router;