
const getCommitsPerUserPerMonth = require('../utils/githubUtils/getCommitsPerUserPerMonth');
const getLanguagesPerUserPerRepo = require('../utils/githubUtils/getLanguagesPerUserPerRepo');
// const getTeamVelocity = require('.../utils/githubUtils/getTeamVelocity');
// const getProjectPRCount = require('../utils/githubUtils/getProjectPRCount');
const getGithubProjectsDashboard = require('../utils/githubUtils/getGithubProjectsDashboard');

require('dotenv').config();

const driver = async () => {

  // wait for data to be returned
  const commits = await getCommitsPerUserPerMonth();
  const languages = await getLanguagesPerUserPerRepo();
  const projects = await getGithubProjectsDashboard();
  
  // need read-write access to Collaborators>Metadata
  //   const teamVelocity = await getTeamVelocity();
  // const prs = await getProjectPRCount();
  


  if(commits 
    && languages 
    && projects
    // && prs
  ){
    console.log(commits);
    console.log(languages);
    console.log(projects);
    //   console.log(teamVelocity);
  }




};

driver();

