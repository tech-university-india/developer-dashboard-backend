const services = require('../services/auth.js');

module.exports = async function (req, res) {
  const token = await services(req.body);
  if (token === 'Invalid id or password.')
    return res.status(400).send(token);
  res.status(200).send(token);
};
