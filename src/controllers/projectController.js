// addMember, getTeam  getTeamByProjectId, getTeamByUserName, getTeamByRole
const httpErrors = require('../../errors/httpErrors');
const projectService = require('../services/projectService');

// create a new project for project_details model 

const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// get all projects for project_details model

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// get a project by project_id for project_details model

const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.project_id);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// update a project by project_id for project_details model

const updateProjectById = async (req, res, next) => {
  try {
    const project = await projectService.updateProjectById(req.params.project_id, req.body);
    res.status(200).json(project);
  }
  catch (error) {
    next(error);
  }
};

// delete a project by project_id for project_details model

const deleteProjectById = async (req, res, next) => {
  try {
    const project = await projectService.deleteProjectById(req.params.project_id);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById
};