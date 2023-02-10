const httpErrors = require('../../errors/httpErrors');
const dashService = require('../services/dashboard');

const getUsers = async (req, res) => {
  try {
    const users = await dashService.getUsers();
    if (users.length === 0) {
      throw new httpErrors('No users found', 404);
    }
    res.status(200).json(users);
  }
  catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.statusCode).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const checkAuth = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await dashService.checkAuth(username, password);
    if (!user) {
      throw new httpErrors('Invalid username or password', 400);
    }
    else {
      res.status(200).json(user);
    }
  }
  catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.statusCode).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = {
  getUsers,
  checkAuth
};
