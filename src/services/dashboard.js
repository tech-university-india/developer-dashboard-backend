
const db = require('../models');
const checkPass = require('../utils/checkPass');

const getUsers = async () => {
  const result = await db.user.findAll();
  return result;
};

const checkAuth = async (uname, password) => {

  // const foundUser = await db.user.findOne({
  //   where: {
  //     username: uname,
  //   },
  // });
  const foundUser = await db.user.findOne({
    where: {
      username: uname,
    },
  });

  if (!foundUser) return false;
  //console.log(password);
  //let hashedpass = await hashPass(password);
  //console.log(hashedpass);
  return await checkPass(password, foundUser.password);

};

module.exports = {
  getUsers,
  checkAuth,
};