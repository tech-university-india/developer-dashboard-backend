const adminService = require('../services/admin');

const createUser = async (request, response) => {

  try {
    const { username,
      fmno,
      firstname,
      lastname,
      email,
      phoneno,
      role } = request.body;
    const newUser = await adminService.createUser(
      username,
      fmno,
      firstname,
      lastname,
      email,
      phoneno,
      role,
      `${firstname}@${fmno}`
    );
    response.status(201).json({ status: 201, data: newUser, message: 'Succesfully  Created User' });
  } catch (error) {
    response.status(500).json({ status: 500, message: error.message });
  }
};
module.exports = { createUser };