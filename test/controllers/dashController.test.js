const dashController = require('../../src/controllers/dashController');
const dashService = require('../../src/services/dashboard');

describe('dashController', () => {
  describe('getUsers', () => {
    it('should return 200 and users if the users are found', async () => {
      jest.spyOn(dashService, 'getUsers').mockResolvedValue([{ fmno: 'fmno', firstname: 'firstname' }]);
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await dashController.getUsers(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.status().json).toBeCalledWith([{ fmno: 'fmno', firstname: 'firstname' }]);
    });
    it('should return 404 and an error message if no users are found', async () => {
      jest.spyOn(dashService, 'getUsers').mockResolvedValue([]);
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await dashController.getUsers(req, res);
      expect(res.status().json).toBeCalledWith({ message: 'No users found' });
    });
    it('should return 500 and an error message if an error occurs at server side', async () => {
      jest.spyOn(dashService, 'getUsers').mockRejectedValue(new Error('Internal Server Error'));
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await dashController.getUsers(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.status().json).toBeCalledWith({ message: 'Internal Server Error' });
    });
  });
  describe('checkAuth', () => {
    it('should return 200 and user if the user is authorized', async () => {
      jest.spyOn(dashService, 'checkAuth').mockResolvedValue({ fmno: 'fmno', firstname: 'firstname' });
      const req = { body: { username: 'username', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await dashController.checkAuth(req, res);
      expect(res.status).toBeCalledWith(200);
    });
    it('should return 400 and an error message if the user is not authorized', async () => {
      jest.spyOn(dashService, 'checkAuth').mockResolvedValue(false);
      const req = { body: { username: 'username', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await dashController.checkAuth(req, res);
      expect(res.status().json).toBeCalledWith({ message: 'Invalid username or password' });

    });
    it('should return 500 and an error message if an error occurs at server side', async () => {
      jest.spyOn(dashService, 'checkAuth').mockRejectedValue(new Error('Internal Server Error'));
      const req = { body: { username: 'username', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await dashController.checkAuth(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.status().json).toBeCalledWith({ message: 'Internal Server Error' });
    });
  });
});
