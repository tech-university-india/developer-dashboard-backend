
const router = require('express').Router();

const { 
  createProject, 
  getAllProjects, 
  getProjectById, 
  updateProjectById, 
  deleteProjectById } = require('../controllers/projectController');

router.post('/create', createProject);
router.get('/', getAllProjects);
router.get('/:project_id', getProjectById);
router.patch('/update/:project_id', updateProjectById);
router.delete('/delete/:project_id', deleteProjectById);

module.exports = router;
