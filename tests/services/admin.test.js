
// Testing DB data creation
const assert = require('assert');
const adminService = require('../../src/services/admin');
const db = require('../../src/models/index');
const { createUser } = require('../../src/services/admin');

describe('Admin Service', () => {

  it('should create a user', async () => {
    const userData = {
      username: 'testuser',
      fmno: '123456',
      firstname: 'test',
      lastname: 'user',
      email: 'user@test.com',
      phoneno: '1234567890',
      role: 'admin',
      password: 'testpassword'
    };
    const user = await createUser(userData.username, userData.fmno, userData.firstname, userData.lastname, userData.email, userData.phoneno, userData.role, userData.password);
    assert.equal(user.username, userData.username);
    assert.equal(user.fmno, userData.fmno);
    assert.equal(user.firstname, userData.firstname);
    assert.equal(user.lastname, userData.lastname);
    assert.equal(user.email, userData.email);
    assert.equal(user.phoneno, userData.phoneno);
    assert.equal(user.role, userData.role);
  });
});
