// addMember, getTeam  getTeamByProjectId, getTeamByUserName, getTeamByRole
const HTTPErrors = require('../../errors/httpErrors');
const projectService = require('../services/projectService');

// create a new project for project_details model 

const createProject = async (req, res, next) => {
  try {

    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    next();
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// get all projects for project_details model

const getAllProjects = async (req, res, next) => {
  try {
    const page = req.query.page;
    const rowsPerPage = req.query.rowsPerPage;
    const projects = await projectService.getAllProjects(page, rowsPerPage);
    res.status(200).json(projects);
  } catch (error) {
    next();
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// get a project by project_id for project_details model

const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.project_id);
    res.status(200).json(project);
  } catch (error) {
    next();
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// update a project by project_id for project_details model

const updateProjectById = async (req, res, next) => {
  try {
    const project = await projectService.updateProjectById(req.params.project_id, req.body);
    res.status(200).json(project);
  }
  catch (error) {
    next();
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// delete a project by project_id for project_details model

const deleteProjectById = async (req, res, next) => {
  try {
    const project = await projectService.deleteProjectById(req.params.project_id);
    res.status(200).json(project);
  } catch (error) {
    next();
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById
};