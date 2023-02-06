
const db = require("../models");
const hashPass = require("../utils/hashPass");
const checkPass = require("../utils/checkPass");


const createUsers = async (User) => {
  //console.log(User);
  const hashedPassword = await hashPass(User.password);
  const newUserDetails = {
    username: User.username,
    fmno: User.fmno,
    firstname: User.firstname,
    lastname: User.lastname,
    email: User.email,
    phoneno: User.phoneno,
    role: User.role,
    password: hashedPassword
  };
  const data = await db.user.create(newUserDetails);
  return data;
};

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
  const foundUser= await db.user.findOne({
    where: {
      username: uname,
    },
  });

  if(!foundUser) return false;
  //console.log(password);
  //let hashedpass = await hashPass(password);
  //console.log(hashedpass);
  return await checkPass(password, foundUser.password);

};

module.exports = {
  createUsers,
  getUsers,
  checkAuth,
  //getBoth,
  //updateCEO,
};