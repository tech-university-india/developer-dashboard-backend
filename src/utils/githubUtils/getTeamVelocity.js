const githubAuth = require('./githubAuth');
const owner = 'temporary-org123';
const repo = 'test';
const since = '2022-01-01T00:00:00Z';

const getTeamVelocity = async () => {
  const octokit = await githubAuth();
  octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: 'closed',
    since,
  }).then(issues => {
    const completedIssues = issues.data.filter(issue => !issue.pull_request);
    console.log(`Completed issues: ${completedIssues.length}`);
  });
  
  octokit.pulls.list({
    owner,
    repo,
    state: 'closed',
    sort: 'updated',
    direction: 'desc',
  }).then(pulls => {
    const mergedPulls = pulls.data.filter(pull => pull.merged_at && pull.merged_at >= since);
    console.log(`Merged pull requests: ${mergedPulls.length}`);
  });
};

module.exports = getTeamVelocity;