const auth = require('../../src/controllers/auth');
jest.mock('../../src/services/auth.js');
let services = require('../../src/services/auth.js');
const jwt = require('jsonwebtoken');
const config = require('config');



describe('auth', ()=>{
  it('should give 400 status when token is not generated', async ()=>{
    const mockReq = {
      body:{

      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    services.mockImplementation(()=>{
      return 'Invalid id or password.';
    });
      
    await auth(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(400);
  });
 
  it('should give 200 status when token is generated', async ()=>{
    const mockReq = {
      body:{

      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    services.mockImplementation(()=>{
      return jwt.sign({ username: 'abc' }, config.get('jwtPrivateKey'), {expiresIn: '20m'});
    });
  
    await auth(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
  });
});