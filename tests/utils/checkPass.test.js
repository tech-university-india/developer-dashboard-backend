const checkAuth = require('../../src/utils/checkPass');
const bcrypt = require('bcrypt');

describe('checkAuth', () => {
  it('should return true if the password is correct', async () => {
    const plaintext = 'password';
    const hashedpass = 'hashedpassword';
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    const result = await checkAuth(plaintext, hashedpass);
    expect(result).toBe(true);
  });
  it('should return false if the password is incorrect', async () => {
    const plaintext = 'password';
    const hashedpass = 'hashedpassword';
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);
    const result = await checkAuth(plaintext, hashedpass);
    expect(result).toBe(false);
  });
});