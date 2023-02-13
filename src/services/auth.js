const bcrypt = require('bcrypt');
const UserAuth = require('../models').userAuth;
const User = require('../models').user;
const jwt = require('jsonwebtoken');
const config = require('config');

const userRole = async (username) => {
  return (await User.findOne({
    where: {
      username: username
    }
  })).dataValues.role;
};

const authenticateUser = async function (reqBody) {
  const { username, password } = reqBody;
  const user = await UserAuth.findOne({
    where: {
      username: username
    }
  });

  if (user===null)
    return 'Invalid id or password.';

  const validPassword = await bcrypt.compare(password, user.dataValues.password);
  
  if (!validPassword)
    return 'Invalid id or password.';

  const role = await userRole(username);
  
  return {
    accessToken: jwt.sign({ username: username, role: role }, config.get('jwtPrivateKey'), {expiresIn: '20m'}),
    refreshToken: jwt.sign({username: username, role: role}, config.get('jwtPrivateKey'), {expiresIn: '1d'})
  };
};

const refreshAccessToken = async function(refreshToken){
  try{
    const decoded = jwt.verify(refreshToken, config.get('jwtPrivateKey'));
    const {username, role} = decoded;
    return jwt.sign({username:username, role: role}, config.get('jwtPrivateKey'), {expiresIn: '20m'});
  }
  catch(ex){
    return 'Invalid refresh token.';
  }
};

module.exports = {refreshAccessToken, authenticateUser, userRole};