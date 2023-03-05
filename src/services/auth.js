const bcrypt = require('bcrypt');
const Credential = require('../models').credential;
const User = require('../models').user;
const jwt = require('jsonwebtoken');
const config = require('config');

const userByUsername = async (username) => {
  return (await User.findOne({
    where: {
      username: username
    }
  })).dataValues;
};

const authenticateUser = async function (reqBody) {
  const { username, password } = reqBody;
  const user = await Credential.findOne({
    where: {
      username: username
    }
  });

  if (user===null)
    return 'Invalid id or password.';

  const validPassword = await bcrypt.compare(password, user.dataValues.password);
  
  if (!validPassword)
    return 'Invalid id or password.';

  const {role, firstname, lastname} = await userByUsername(username);
  
  return {
    accessToken: jwt.sign({ username: username, role: role }, config.get('jwtPrivateKey'), {expiresIn: '20m'}),
    refreshToken: jwt.sign({username: username, role: role}, config.get('jwtPrivateKey'), {expiresIn: '1d'}),
    username: username,
    firstname: firstname,
    lastname: lastname,
    userRole: role
  };
};

const refreshAccessToken = async function(refreshToken){
  try{
    const decoded = jwt.verify(refreshToken, config.get('jwtPrivateKey'));
    const {username, role} = decoded;
    return jwt.sign({username:username, role: role}, config.get('jwtPrivateKey'), {expiresIn: '1d'});
  }
  catch(ex){
    return 'Invalid refresh token.';
  }
};

module.exports = {refreshAccessToken, authenticateUser};
