const {validateRequest, verifyJWT, isAdmin, isDeveloper, isManager, isLeadership} = require('../../src/middlewares/auth');

const jwt = require('jsonwebtoken');

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
        jwt.sign({ username: 'abcd' }, process.env.jwtPrivateKey, {expiresIn: '20m'})
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

describe('isAdmin', ()=>{
  it('should return 403 status when user is not admin', ()=>{
    const mockReq={
      user:{
        role: 'developer'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    isAdmin(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(403);
  });
  it('should call next when user is admin', ()=>{
    const mockReq={
      user:{
        role: 'admin'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    isAdmin(mockReq, mockRes, next);
    expect(next).toBeCalled();
  });
});


describe('isDeveloper', ()=>{
  it('should return 403 status when user is not developer', ()=>{
    const mockReq={
      user:{
        role: 'admin'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    isDeveloper(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(403);
  });
  it('should call next when user is developer', ()=>{
    const mockReq={
      user:{
        role: 'developer'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    isDeveloper(mockReq, mockRes, next);
    expect(next).toBeCalled();
  });
});

describe('isManager', ()=>{
  it('should return 403 status when user is not manager', ()=>{
    const mockReq={
      user:{
        role: 'admin'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    isManager(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(403);
  });
  it('should call next when user is manager', ()=>{
    const mockReq={
      user:{
        role: 'manager'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    isManager(mockReq, mockRes, next);
    expect(next).toBeCalled();
  });
});

describe('isLeadership', ()=>{
  it('should return 403 status when user is not of Leadership role', ()=>{
    const mockReq={
      user:{
        role: 'admin'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    isLeadership(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(403);
  });
  it('should call next when user is super manager', ()=>{
    const mockReq={
      user:{
        role: 'leadership'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    isLeadership(mockReq, mockRes, next);
    expect(next).toBeCalled();
  });
});