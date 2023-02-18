const router = require('express').Router();
const { createSurvey, getSurveys } = require('../controllers/surveyController');
const { createSurveyValidator, getSurveysValidator } = require('../middlewares/surveyValidator');

router.post('', createSurveyValidator, createSurvey);
router.get('', getSurveysValidator, getSurveys);


module.exports = router;