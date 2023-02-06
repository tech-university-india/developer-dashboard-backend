
const bcrypt = require("bcrypt");
const saltRounds = 10;


const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);

  // console.log(password, salt);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = hashPass;
