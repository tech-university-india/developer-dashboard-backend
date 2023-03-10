// services for project details
const db = require('../models');
const httpErrors = require('../../errors/httpErrors');

// create a new project for project_details model

const createProject = async (project) => {
  const projectDetails = {
    project_id: project.project_id,
    project_name: project.project_name,
    client: project.client,
    poc: project.poc,
    description: project.description,
    github: project.github,
    jira: project.jira,
    misc: project.misc,
    start_date: project.start_date,
    end_date: project.end_date
  };
  const newProject = await db.project_details.create(projectDetails);
  return newProject;
};

// get all projects for project_details model

const getAllProjects = async () => {
  const projects = await db.project_details.findAll();
  return projects;
};

// get a project by project_id for project_details model

const getProjectById = async (project_id) => {
  const project = await db.project_details.findOne({
    where: {
      project_id: project_id
    }
  });
  if (!project) {
    throw new httpErrors.NotFoundError('Project not found');
  }
  return project;
};

// update a project by project_id for project_details model

const updateProjectById = async (project_id, project) => {
  const updatedProject = await db.project_details.update(project, {
    where: {
      project_id: project_id
    }
  });
  if (!updatedProject) {
    throw new httpErrors.NotFoundError('Project not found');
  }
  return updatedProject;
};

// delete a project by project_id for project_details model

const deleteProjectById = async (project_id) => {
  const deletedProject = await db.project_details.destroy({
    where: {
      project_id: project_id
    }
  });
  if (!deletedProject) {
    throw new httpErrors.NotFoundError('Project not found');
  }
  return deletedProject;
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById
};