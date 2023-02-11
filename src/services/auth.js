const bcrypt = require("bcrypt");
const UserAuth = require("../models").userAuth;
const jwt = require("jsonwebtoken");
const config = require("config");
// console.log(typeof config);
module.exports = async function (reqBody) {
  const { username, password } = reqBody;
  const user = await UserAuth.findOne({
    where: {
      username: username
    }
  });

  if (!user)
    return "Invalid id or password.";

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return "Invalid id or password.";

  return jwt.sign({ username: username }, config.get("jwtPrivateKey"), {expiresIn: "20m"});
};