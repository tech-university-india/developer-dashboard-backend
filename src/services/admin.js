const sendInBlueUtil = require('../utils/sendinblue');
const hashPass = require('../utils/hashPass');
const db = require('../models/index');
const HTTPError = require('../utils/error');

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
  await db.credential.create({ userid: userDetails.id, password: encryptedPassword });
  await sendInBlueUtil.sendEmail(email, firstname + ' ' + lastname, password);
  return userDetails;
};

const updateUser = async (id, username, fmno, firstname, lastname, email, phoneno, role) => {
  if (!db.user.findOne({ where: { id: id } }))
    throw new HTTPError('User not found', 400);
  const userData = {
    username: username,
    fmno: fmno,
    firstname: firstname,
    lastname: lastname,
    email: email,
    phoneno: phoneno,
    role: role,
  };
  const user = db.user.update(userData, { where: { id: id } });
  return user;
};
const getUser = async (id) => {
  const user = db.user.findOne({ where: { id: id } });
  if (!user)
    throw new HTTPError('User not found', 400);
  return user;
};
module.exports = { createUser, updateUser, getUser };