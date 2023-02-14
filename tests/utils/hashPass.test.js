const hashPass = require('../../src/utils/hashPass');
const bcrypt = require('bcrypt');
describe('hashPass', () => {
  it('should return a hashed password', async () => {
    const password = 'password';
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'hashedpassword');
    jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => 'salt');
    const result = await hashPass(password);
    expect(result).toBe('hashedpassword');
  });
});