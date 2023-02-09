//project_directory/emailBuilder.js

var SibApiV3Sdk = require("sib-api-v3-sdk");
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = "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";


const sendEmail = async (email, name, password) => {
  await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
    {
      "subject": "Auth Credentials",
      "sender": { "email": "ashutoshsenapati2311@gmail.com", "name": "Ashutosh Senapati" },
      "replyTo": { "email": "api@sendinblue.com", "name": "Sendinblue" },
      "to": [{ "name": name, "email": email }],
      "htmlContent": "<html><body><h1>Your password is{{params.bodyMessage}}</h1></body></html>",
      "params": { "bodyMessage": "firstname@firm_number" }
    }
  ).then(function (data) {
    console.log(`Sent mail to ${email}`);
  }, function (error) {
    console.error(error);
  });
};
module.exports = { sendEmail };