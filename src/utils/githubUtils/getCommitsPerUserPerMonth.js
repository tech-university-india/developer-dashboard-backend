
const githubAuth = require('./githubAuth');

const owner = 'temporary-org123';
const date = new Date();
const since = new Date(date.getFullYear(), date.getMonth() - 1, 1);
const until = new Date(date.getFullYear(), date.getMonth(), 0);

const getCommitPerUserPerMonth = async () => {
  const octokit = await githubAuth();
  octokit.paginate(octokit.rest.repos.listForOrg, {
    org: owner,
    type: 'all',
  }).then(repos => {
    repos.forEach(repo => {
      octokit.paginate(octokit.repos.listCommits, {
        owner,
        repo: repo.name,
        since,
        until,
      }).then(commits => {
        const users = {};
        commits.forEach(commit => {
          const email = commit.commit.author.email;
          if (users[email]) {
            users[email]++;
          } else {
            users[email] = 1;
          }
        });
        // return users;
        console.log(users);
      });

    });
  });
};


module.exports = getCommitPerUserPerMonth;