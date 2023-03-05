const services = require('../services/auth.js');

const authenticateUser =  async function(req, res){
  const tokens = await services.authenticateUser(req.body);
  if(tokens==='Invalid id or password.')
    return res.status(400).send(tokens);
  
  res.cookie('jwt', tokens.refreshToken, {
    httpOnly: true, 
    sameSite: 'None', 
    secure: true, 
    maxAge: 24 * 60 * 60 * 1000 
  });
  
  res.status(200).send({accessToken: tokens.accessToken, role: tokens.userRole, username:tokens.username, firstname: tokens.firstname, lastname: tokens.lastname});
};

const refreshAccessToken = async function(req, res){
  const refreshToken = req.cookies.jwt;
  // res.send(typeof refreshToken);
  if(!refreshToken)
    return res.status(400).send('Refresh token not provided.');
  
  const accessToken = await services.refreshAccessToken(refreshToken);
  if(accessToken==='Invalid refresh token.')
    return res.status(400).send(accessToken);
  res.status(200).send(accessToken);
};

module.exports = {authenticateUser, refreshAccessToken};