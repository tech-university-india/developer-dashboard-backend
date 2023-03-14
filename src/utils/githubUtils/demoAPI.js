const githubAuth = require('./githubAuth');
// issues per sprint (open/close)
// no of features (branches)
// total commits in org in 1 month


const getOrganizationRepos = async (orgName) => {
  const octokit = await githubAuth();
  const { data } = await octokit.request('GET /orgs/{org}/repos', {
    org: orgName,
  });
  console.log(data);
  return data;
};
  
const getOrganizationRepoIssues = async (orgName, orgRepo) => {
  const octokit = await githubAuth();
  const { data } = await octokit.request('GET /repos/{org}/{repo}/issues', {
    org: orgName,
    repo: orgRepo,
    // state: 'all',
  });
  console.log(data);

  return data;
};

const getOrganizationRepoPullRequests = async (orgName, orgRepo) => {
  const octokit = await githubAuth();
  const { data } = await octokit.request('GET /repos/{org}/{repo}/pulls', {
    org: orgName,
    repo: orgRepo,
    state: 'all',
  });
  console.log(data);

  return data;
};

const getOrganizationRepoCommits = async (orgName, orgRepo) => {
  const octokit = await githubAuth();
  const { data } = await octokit.request('GET /repos/{org}/{repo}/commits', {
    org: orgName,
    repo: orgRepo,
  });
  console.log(data);

  return data;
};

const getOrganizationRepoBranches = async (orgName, orgRepo) => {
  const octokit = await githubAuth();
  const { data } = await octokit.request('GET /repos/{org}/{repo}/branches', {
    org: orgName,
    repo: orgRepo,
  });
  console.log(data);

  return data;
};

getOrganizationRepoIssues('temporary-org123', 'temp-repo');
// getOrganizationRepoPullRequests('temporary-org123', 'temp-repo');
// getOrganizationRepoCommits('temporary-org123', 'temp-repo');
// getOrganizationRepoBranches('temporary-org123', 'temp-repo');
// getOrganizationRepos('temporary-org123');


module.exports = {
  getOrganizationRepoIssues,
  getOrganizationRepoPullRequests,
  getOrganizationRepoCommits,
  getOrganizationRepoBranches,
  getOrganizationRepos,
};
