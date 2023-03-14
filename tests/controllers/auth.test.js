
const {authenticateUser, refreshAccessToken} = require('../../src/controllers/auth');
jest.mock('../../src/services/auth.js');
let services = require('../../src/services/auth.js');
// const jwt = require('jsonwebtoken');



describe('authenticateUser', ()=>{

  it('should give 400 status when token is not generated', async ()=>{
    const mockReq = {
      body:{

      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    services.authenticateUser.mockImplementation(()=>{
      return 'Invalid id or password.';
    });
      
    await authenticateUser(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(400);
  });
 
  it('should give 200 status when token is generated', async ()=>{
    const mockReq = {
      body:{

      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      cookie: jest.fn()
    };

    services.authenticateUser.mockImplementation(()=>{
      return 'mockAccessToken';
    });
  
    await authenticateUser(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.cookie).toBeCalled();
  });
});

describe('refreshAccessToken', ()=>{
  it('should return 400 status when no refresh token is provided', async ()=>{
    const mockReq = {
      cookies: {
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    await refreshAccessToken(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(400);
  });

  it('should return 400 status when invalid refresh token is provided', async()=>{
    const mockReq = {
      cookies: {
        jwt: 'abc'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    
    services.refreshAccessToken.mockImplementation(()=>{
      return 'Invalid refresh token.';
    });

    await refreshAccessToken(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(400);
  });

  it('should return 200 status when valid refresh token is provided', async ()=>{
    const mockReq = {
      cookies: {
        jwt: 'abc'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    services.refreshAccessToken.mockImplementation(()=>{
      return 'abcd';
    });

    await refreshAccessToken(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
  });

});