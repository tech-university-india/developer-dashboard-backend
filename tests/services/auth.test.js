const {authenticateUser, refreshAccessToken} = require('../../src/services/auth.js');
const UserAuth = require('../../src/models').userAuth;
const User = require('../../src/models').user;
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');


describe('authenticateUser', () => {
  it('should return JWT when correct credentials are given.', async () => {
    const mockReqBody = {
      username: 'abc',
      password: 'xyz'
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mockReqBody.password, salt);

    const returnValue = {
      dataValues: {
        username: 'abc',
        password: hashedPassword
      }
    };

    jest.spyOn(UserAuth, 'findOne').mockResolvedValue(returnValue);
    jest.spyOn(User, 'findOne').mockResolvedValue({dataValues: {role:'admin'}});

    const tokens = await authenticateUser(mockReqBody);
    const decodedAccessToken = jwt.verify(tokens.accessToken, config.get('jwtPrivateKey'));
    const decodedRefreshToken = jwt.verify(tokens.refreshToken, config.get('jwtPrivateKey'));
    

    expect(decodedAccessToken.username).toBe(mockReqBody.username);
    expect(decodedRefreshToken.username).toBe(mockReqBody.username);
  });

  it('should not return JWT when wrong password is given.', async () => {
    const mockReqBody = {
      username: 'abc',
      password: 'xyz'
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123', salt);

    const returnValue = {
      dataValues:{
        username: 'abc',
        password: hashedPassword
      }
    };

    jest.spyOn(UserAuth, 'findOne').mockResolvedValue(returnValue);

    const token = await authenticateUser(mockReqBody);
    expect(token).toBe('Invalid id or password.');
  });

  it('should not return JWT when user is not registered.', async () => {
    const mockReqBody = {
      username: 'abc',
      password: 'xyz'
    };

    const returnValue = null;

    jest.spyOn(UserAuth, 'findOne').mockResolvedValue(returnValue);

    const token = await authenticateUser(mockReqBody);
    expect(token).toBe('Invalid id or password.');
  });
});

describe('refreshAccessToken', ()=>{
  it('should return an access token when valid refresh token is provided.', async()=>{
    const refreshToken = jwt.sign({username: 'abc', role: 'xyz'}, config.get('jwtPrivateKey'), {expiresIn: '1d'});
    
    const accessToken = await refreshAccessToken(refreshToken);

    const decodedAccessToken = jwt.verify(accessToken, config.get('jwtPrivateKey'));
    expect(decodedAccessToken.username).toBe('abc');
    expect(decodedAccessToken.role).toBe('xyz');
  });

  it('should return exception message when wrong refresh token is provided.', async()=>{
    const result = await refreshAccessToken('abcd');
    expect(result).toBe('Invalid refresh token.');
  });

});