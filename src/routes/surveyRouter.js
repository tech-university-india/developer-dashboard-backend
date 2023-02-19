const router = require('express').Router();
const { createSurvey, getSurveys, postQuestions, getSurveyQuestions } = require('../controllers/surveyController');
const { createSurveyValidator, getSurveysValidator, postQuestionsValidator, getSurveyQuestionsValidator } = require('../middlewares/surveyValidator');

router.post('', createSurveyValidator, createSurvey);
router.get('', getSurveysValidator, getSurveys);
router.post('/questions', postQuestionsValidator, postQuestions);
router.get('/questions', getSurveyQuestionsValidator, getSurveyQuestions);

module.exports = router;