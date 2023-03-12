
const githubAuth = require('./githubAuth');
const owner = 'temporary-org123';

const getLanguagesPerUserPerRepo = async () => {
  const octokit = await githubAuth();
  octokit.paginate(octokit.rest.repos.listForOrg, {
    org: owner,
    type: 'all',
  }).then(repos => {
    repos.forEach(repo => {
      octokit.repos.listContributors({
        owner,
        repo: repo.name,
      }).then(contributors => {
        contributors.data.forEach(contributor => {
          octokit.repos.listLanguages({
            owner,
            repo: repo.name,
          }).then(languages => {
            console.log(`${contributor.login} - ${repo.name}:`, languages.data);
          });
        });
      });
    });
  });
};

module.exports = getLanguagesPerUserPerRepo;