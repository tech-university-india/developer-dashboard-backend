const githubAuth = require('./githubAuth');
const owner = 'temporary-org123';

const getProjectPRCount = async () => {
  const octokit = await githubAuth();
  octokit.paginate(octokit.rest.repos.listForOrg, {
    org: owner,
    type: 'all',
  }).then(repos => {
    repos.forEach(repo => {
      octokit.pulls.list({
        owner,
        repo: repo.name,
        state: 'all',
      }).then(pulls => {
        console.log(`${repo.name}: ${pulls.data.length} pull requests`);
      });
    });
  });
};

module.exports = getProjectPRCount;