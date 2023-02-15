const {validateRequest, verifyJWT} = require('../../src/middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('validateRequest', ()=>{
  it('should return bad request when username is not provided', ()=>{
    const mockReq={
      body:{
        password:'1234'
      }
    };
    const mockRes={
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    validateRequest(mockReq, mockRes, next);

    expect(mockRes.status).toBeCalledWith(400);
  });
  
  it('should return bad request when password is not provided', ()=>{
    const mockReq={
      body:{
        username: 'abc'
      }
    };
    const mockRes={
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    validateRequest(mockReq, mockRes, next);

    expect(mockRes.status).toBeCalledWith(400);
  });
  
  it('should call next when username and password are provided', ()=>{
    const mockReq={
      body:{
        username: 'abc',
        password: '123'
      }
    };
    const mockRes={
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    validateRequest(mockReq, mockRes, next);

    expect(next).toBeCalledWith();
  });
});

describe('verifyJWT', ()=>{
  it('should return 401 when token is not provided', ()=>{
    const mockReq = {
      header: jest.fn().mockReturnValue(undefined)
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    verifyJWT(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(401);
  });

  it('should return 400 when wrong token is provided', ()=>{
    const mockReq = {
      header: jest.fn().mockReturnValue('abcd')
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    verifyJWT(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(400);
  });

  it('should call next when valid token is provided', ()=>{
    const mockReq = {
      header: jest.fn().mockReturnValue(
        jwt.sign({ username: 'abcd' }, config.get('jwtPrivateKey'), {expiresIn: '20m'})
      )
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    verifyJWT(mockReq, mockRes, next);
    expect(next).toBeCalledWith();
  });

});