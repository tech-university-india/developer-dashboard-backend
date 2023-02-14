const sendInBlueUtil = require('../utils/sendinblue');
const hashPass = require('../utils/hashPass');
const db = require('../models');

const createUser = async (username, fmno, firstname, lastname, email, phoneno, role, password) => {
  const userData = {
    username: username,
    fmno: fmno,
    firstname: firstname,
    lastname: lastname,
    email: email,
    phoneno: phoneno,
    role: role,
  };
  const encryptedPassword = await hashPass(password);
  const userDetails = await db.user.create(userData);
  const cred = await db.credential.create({ userid: userDetails.id, password: encryptedPassword });
  await sendInBlueUtil.sendEmail(email, firstname + ' ' + lastname, password);
  return userDetails;
};
module.exports = { createUser };