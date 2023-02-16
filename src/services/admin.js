const sendInBlueUtil = require('../utils/sendinblue');
const hashPass = require('../utils/hashPass');
const db = require('../models');
const HTTPError = require('../utils/httpError');

const createUser = async (username, fmno, firstname, lastname, email, phoneno, role, github, password) => {
  const userData = {
    username: username,
    fmno: fmno,
    firstname: firstname,
    lastname: lastname,
    email: email,
    phoneno: phoneno,
    role: role,
    github: github
  };
  const encryptedPassword = await hashPass(password);
  const userDetails = await db.user.create(userData);
  await db.credential.create({ username: username, password: encryptedPassword });
  await sendInBlueUtil.sendEmail(email, firstname + ' ' + lastname, password);
  return userDetails;
};
const updateUser = async (id, username, fmno, firstname, lastname, email, phoneno, role, github) => {
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
    github: github
  };
  await db.user.update(userData, { where: { id: id } });
  const user = db.user.findOne({ where: { id: id } });
  return user;
};
const getUsers = async () => {
  const users = await db.user.findAll();
  return users;
};
module.exports = { createUser, updateUser, getUsers };