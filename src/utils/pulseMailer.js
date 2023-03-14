const { user, teams } = require('../models/index');
const sib = require('sib-api-v3-sdk');
const cron = require('node-cron');
require('dotenv').config();
const defaultClient = sib.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.PULSE_KEY;
const transactionalEmailsApi = new sib.TransactionalEmailsApi();
const sender = {
  email: process.env.PULSE_EMAIL,
};

const sendMail = async () => {
  //send mail every monday at 11:00 am
  cron.schedule('0 11 * * 1', async () => {
    const projects = await teams.findAll({ attributes: ['project_id', 'username'] });
    for (let i = 0; i < projects.length; i++) {
      const username = projects[i].dataValues.username;
      const mail = await user.findOne({ where: { username: username }, attributes: ['email'] });
      projects[i].dataValues.email = mail.dataValues.email;

      const to = [{
        email: projects[i].dataValues.email,
      }];
      transactionalEmailsApi.sendTransacEmail({
        sender,
        to,
        subject: `Please submit your monthly pulse survey ${username}`,
        htmlContent: `<h1>How are you feeling in this project ${username}</h1><a href='http://localhost:8080/pulse/add/?username=${username}&project_id=${projects[i].dataValues.project_id}&pulse=5' style='font-size: 50px; text-decoration: none;'>😀</a><a href='http://localhost:8080/pulse/add/?username=${username}&project_id=${projects[i].dataValues.project_id}&pulse=4' style='font-size: 50px; text-decoration: none;'>😊</a><a href='http://localhost:8080/pulse/add/?username=${username}&project_id=${projects[i].dataValues.project_id}&pulse=3' style='font-size: 50px; text-decoration: none;'>😐</a><a href='http://localhost:8080/pulse/add/?username=${username}&project_id=${projects[i].dataValues.project_id}&pulse=2' style='font-size: 50px; text-decoration: none;'>😔</a><a href='http://localhost:8080/pulse/add/?username=${username}&project_id=${projects[i].dataValues.project_id}&pulse=1' style='font-size: 50px; text-decoration: none;'>😩</a>`
      })
        .then((data) => {
          // console.log('API called successfully. Returned data: ' + data);
        })
        .catch((error) => console.error(error));

    }
  });
};

module.exports = { sendMail };