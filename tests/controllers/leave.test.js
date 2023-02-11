const leaveController = require('../../src/controllers/leaveController');
const leaveService = require('../../src/services/leave');

describe('Leave Controller', () => {

  describe('createLeave', () => {
    it('should return 201 status code when leave is created', async () => {
      jest.spyOn(leaveService, 'createLeave').mockResolvedValue({
        username: 'test user',
        start_date: '2021-01-01',
        end_date: '2021-01-01'
      });

      const mockReq = {
        body: {
          username: 'test user',
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.createLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({
        status: 201,
        data: {
          username: 'test user',
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        },
        message: 'Succesfully Created Leave'
      });
    });

    it('should return 500 status code when leave is not created', async () => {
      jest.spyOn(leaveService, 'createLeave').mockRejectedValue(new Error('Error'));

      const mockReq = {
        body: {
          username: 'test user',
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.createLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: 'Error'
      });
    });
  });

  describe('deleteLeave', () => {
    it('should return 200 status code when leave is deleted', async () => {
      jest.spyOn(leaveService, 'deleteLeave').mockResolvedValue([1]);

      const mockReq = {
        params: {
          id: 1
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.deleteLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        status: 200,
        data: [1],
        message: 'Succesfully Deleted Leave'
      });
    });

    it('should return 500 status code when leave is not deleted', async () => {
      jest.spyOn(leaveService, 'deleteLeave').mockRejectedValue(new Error('Error'));

      const mockReq = {
        params: {
          id: 1
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.deleteLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: 'Error'
      });
    });

    it('should return 404 status code when leave is not found', async () => {
      jest.spyOn(leaveService, 'deleteLeave').mockResolvedValue([0]);

      const mockReq = {
        params: {
          id: 1
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.deleteLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({
        status: 404,
        message: 'Leave Not Found'
      });
    });
  });

  describe('getLeaves', () => {
    it('should return 200 status code when leaves are found', async () => {
      jest.spyOn(leaveService, 'getLeaves').mockResolvedValue([{
        username: 'test user',
        start_date: '2021-01-01',
        end_date: '2021-01-01'
      }]);

      const mockReq = {
        params: {
          username: 'test user'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.getLeaves(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        status: 200,
        data: [{
          username: 'test user',
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        }],
        message: 'Succesfully Retrieved Leaves'
      });
    });

    it('should return 500 status code when leaves are not found', async () => {
      jest.spyOn(leaveService, 'getLeaves').mockRejectedValue(new Error('Error'));

      const mockReq = {
        params: {
          username: 'test user'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.getLeaves(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: 'Error'
      });
    });

    it('should return 404 status code when leaves are not found', async () => {
      jest.spyOn(leaveService, 'getLeaves').mockResolvedValue([]);

      const mockReq = {
        params: {
          username: 'test user'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.getLeaves(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({
        status: 404,
        message: 'Leaves Not Found'
      });
    });
  });
});



  



