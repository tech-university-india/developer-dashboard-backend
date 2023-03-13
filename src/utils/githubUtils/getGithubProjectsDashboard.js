const githubAuth = require('./githubAuth');
const owner = 'temporary-org123';

const getGithubProjectsDashboard = async () => {
  const octokit = await githubAuth();
  octokit.projects.listForOrg({
    org: owner,
  }).then(projects => {
    projects.data.forEach(project => {
      console.log(`Project: ${project.name}`);

      octokit.projects.listColumns({
        project_id: project.id,
      }).then(columns => {
        columns.data.forEach(column => {
          console.log(`  Column: ${column.name}`);

          octokit.projects.listCards({
            column_id: column.id,
          }).then(cards => {
            cards.data.forEach(card => {
              console.log(`    Card: ${card.note || card.content_url}`);
            });
          });
        });
      });
    });
  });
};

module.exports = getGithubProjectsDashboard;