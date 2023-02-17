const adminService = require('../services/admin');

const createUser = async (request, response) => {
  try {
    const { username,
      fmno,
      firstname,
      lastname,
      email,
      phoneno,
      role,
      github
    } = request.body;
    const newUser = await adminService.createUser(
      username,
      fmno,
      firstname,
      lastname,
      email,
      phoneno,
      role,
      github,
      `${firstname}@${fmno}`
    );
    return response.status(201).json(newUser);
  } catch (error) {
    response.status(500).json({ status: 500, message: error.message });
  }
};
const updateUser = async (request, response) => {
  try {
    const {
      id,
      username,
      fmno,
      firstname,
      lastname,
      email,
      phoneno,
      role,
      github
    } = request.body;
    const newUser = await adminService.updateUser(
      id,
      username,
      fmno,
      firstname,
      lastname,
      email,
      phoneno,
      role,
      github
    );
    return response.status(200).json(newUser);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
const getUsers = async (request, response) => {
  try {
    const users = await adminService.getUsers();
    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json(error.message);
  }

};
module.exports = { createUser, updateUser, getUsers };