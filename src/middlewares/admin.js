const joi = require('Joi');

const validateUser = (request, response, next) => {
  const schema = joi.object({
    username: joi.string().required(),
    fmno: joi.string().required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().required(),
    phoneno: joi.string().required(),
    role: joi.string().required(),
  });
  const result = schema.validate(request.body);

  const { error } = result;
  if (error)
    return response.status(400).send(error);

  next();
};
const validateUserUpdate = (request, response, next) => {
  const schema = joi.object({
    id: joi.string().required(),
    username: joi.string().required(),
    fmno: joi.string().required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().required(),
    phoneno: joi.string().required(),
    role: joi.string().required(),
  });
  const result = schema.validate(request.body);

  const { error } = result;
  if (error)
    return response.status(400).send(error);

  next();
};
module.exports = { validateUser, validateUserUpdate };