// const { Octokit } = require('@octokit/core');
const { Octokit } = require('@octokit/rest');
const { createAppAuth } = require('@octokit/auth-app');

// require('dotenv').config();
// directory to env file
const path = require('path');
const envPath = path.join(__dirname, '../../../.env');
require('dotenv').config({ path: envPath });

const githubAuth = async () => {
  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_IDENTIFIER,
    privateKey: process.env.PRIVATE_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.GITHUB_WEBHOOK_SECRET,
  });
  
  const { token } = await auth({ type: 'installation', installationId: '34058965' });
  //const { token } = await auth({ type: "app"});

  const octokit = new Octokit({
    auth: token
  });

  return octokit;
};

module.exports = githubAuth;

