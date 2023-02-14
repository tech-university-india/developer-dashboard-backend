const adminService = require('../../src/services/admin');
const adminController = require('../../src/controllers/admin');

describe('AdminController', () => {
  describe('createUser', () => {

  });
  describe('updateUser', () => {
    it('should return expected response', async () => {
      const mockReq = {
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(adminService, 'updateUser').mockResolvedValue([{
        'id': 1,
        'name': 'Axis',
        'score': 26.65
      }]);
      await adminController.updateUser(mockReq, mockRes);
      expect(mockRes.json).toBeCalledWith({
        status: 201, data: [{
          'id': 1,
          'name': 'Axis',
          'score': 26.65
        }], message: 'Succesfully  Created User'
      });
    });
    it('should return status 400 when user is not found', async () => {
      const mockReq = {
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(adminService, 'updateUser').mockResolvedValue([{
        'id': 1,
        'name': 'Axis',
        'score': 26.65
      }]);
      await adminController.updateUser(mockReq, mockRes);
      expect(mockRes.json).toBeCalledWith({
        status: 201, data: [{
          'id': 1,
          'name': 'Axis',
          'score': 26.65
        }], message: 'Succesfully  Created User'
      });
    });
  });
  describe('getUser', () => {
    it('should return status 200 and user', async () => {
      const mockReq = {
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(adminService, 'updateUser').mockResolvedValue([{
        'id': 1,
        'name': 'Axis',
        'score': 26.65
      }]);
      await adminController.updateUser(mockReq, mockRes);
      expect(mockRes.json).toBeCalledWith({
        status: 201, data: [{
          'id': 1,
          'name': 'Axis',
          'score': 26.65
        }], message: 'Succesfully  Created User'
      });
    });
    it('should return status 400 when user is not found', async () => {
      const mockReq = {
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(adminService, 'updateUser').mockResolvedValue([{
        'id': 1,
        'name': 'Axis',
        'score': 26.65
      }]);
      await adminController.updateUser(mockReq, mockRes);
      expect(mockRes.json).toBeCalledWith({
        status: 201, data: [{
          'id': 1,
          'name': 'Axis',
          'score': 26.65
        }], message: 'Succesfully  Created User'
      });
    });
    it('should return status 500 when an error occurs', async () => {
      const mockReq = {
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(adminService, 'updateUser').mockResolvedValue([{
        'id': 1,
        'name': 'Axis',
        'score': 26.65
      }]);
      await adminController.updateUser(mockReq, mockRes);
      expect(mockRes.json).toBeCalledWith({
        status: 201, data: [{
          'id': 1,
          'name': 'Axis',
          'score': 26.65
        }], message: 'Succesfully  Created User'
      });
    });
  });
});