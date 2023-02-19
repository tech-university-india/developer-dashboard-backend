const { Octokit } = require('@octokit/core');
const { createAppAuth } = require('@octokit/auth-app');

require('dotenv').config();

const githubAuth = async () => {
  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_IDENTIFIER,
    privateKey: process.env.PRIVATE_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.GITHUB_WEBHOOK_SECRET,
  });

  const { token } = await auth({ type: 'installation', installationId: process.env.GITHUB_APP_INSTALLATION_ID });
  //const { token } = await auth({ type: "app"});

  const octokit = new Octokit({
    auth: token
  });

  return octokit;
};

module.exports = githubAuth;

