const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('Joi');

function verifyJWT(req, res, next) {
  const token = req.header('x-auth-token');
  if(!token)
    return res.status(401).send('Access denied. No token provided.');
    
  try{
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  }
  catch(ex){
    res.status(400).send('Invalid token.');
  }
}

function validateRequest(req, res, next){
  const schema = Joi.object().keys({ 
    username: Joi.string().required(),
    password: Joi.string().required()
  });
    
  const result = schema.validate(req.body);
    
  const {error} = result;
    
  if(error)
    return res.status(400).send(error);

  next();
}

function isAdmin(req, res, next){  
  if(req.user.role!=='admin')
    return res.status(403).send('Access denied. Unauthorised.');
  next();
}

function isDeveloper(req, res, next){
  if(req.user.role!=='developer')
    return res.status(403).send('Access denied. Unauthorised.');
  next();
}
function isManager(req, res, next){
  if(req.user.role!=='manager')
    return res.status(403).send('Access denied. Unauthorised.');
  next();
}
function isLeadership(req, res, next){
  if(req.user.role!=='leadership')
    return res.status(403).send('Access denied. Unauthorised.');
  next();
}

module.exports = {validateRequest, verifyJWT, isAdmin, isDeveloper, isManager, isLeadership};