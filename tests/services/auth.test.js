const auth = require('../../src/services/auth');
const UserAuth = require('../../src/models').userAuth;
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');


describe('auth', () => {
  it('should return JWT when correct credentials are given.', async () => {
    const mockReqBody = {
      username: 'abc',
      password: 'xyz'
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mockReqBody.password, salt);

    const returnValue = {
      username: 'abc',
      password: hashedPassword
    };

    jest.spyOn(UserAuth, 'findOne').mockResolvedValue(returnValue);

    const token = await auth(mockReqBody);
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded.username).toBe(returnValue.username);
  });

  it('should not return JWT when wrong password is given.', async () => {
    const mockReqBody = {
      username: 'abc',
      password: 'xyz'
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123', salt);

    const returnValue = {
      username: 'abc',
      password: hashedPassword
    };

    jest.spyOn(UserAuth, 'findOne').mockResolvedValue(returnValue);

    const token = await auth(mockReqBody);
    expect(token).toBe('Invalid id or password.');
  });

  it('should not return JWT when user is not registered.', async () => {
    const mockReqBody = {
      username: 'abc',
      password: 'xyz'
    };

    const returnValue = undefined;

    jest.spyOn(UserAuth, 'findOne').mockResolvedValue(returnValue);

    const token = await auth(mockReqBody);
    expect(token).toBe('Invalid id or password.');
  });

});