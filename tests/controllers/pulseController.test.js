const services = require('../../src/services/pulseServices');
const controller = require('../../src/controllers/pulseController');
const httpErrors = require('../../errors/httpErrors');

describe('Pulse Controller', () => {
  describe('addPulse', () => {
    it('should return 201 status code and success message when pulse is added successfully', async () => {
      const req = {
        query: { project_id: 1, username: 'user1', pulse: 5, },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, 'addPulse').mockResolvedValue({ message: 'Pulse reported successfully' });
      await controller.addPulse(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Pulse reported successfully' });
    });
    it('should return 400 status code and error message when pulse is already reported for the month', async () => {
      const req = {
        query: { project_id: 1, username: 'user1', pulse: 5, },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, 'addPulse').mockRejectedValue(new httpErrors('Pulse already reported for this month', 400));
      await controller.addPulse(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Pulse already reported for this month' });
    });
    it('should return 500 status code and error message when system error is thrown', async () => {
      const req = {
        body: { project_id: 1, username: 'user1', pulse: 5, },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, 'addPulse').mockRejectedValue(new Error('Internal Server Error'));
      await controller.addPulse(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  describe('getPulse', () => {
    it('should return 200 status code and pulse data when pulse is fetched successfully', async () => {
      const req = {
        query: { viewer: 'user1' }
      };
      const res = {
        status: jest.fn().mockReturnThis(), json: jest.fn()
      };
      jest.spyOn(services, 'getPulse').mockResolvedValue({
        x_axis: ['Jan', 'Feb', 'Mar', 'Apr'],
        y_axis: [{
          name: 'Terrible',
          data: [1, 2, 3, 5]
        },
        {
          name: 'Ok',
          data: [1, 3, 5, 1]
        },
        {
          name: 'Good',
          data: [2, 4, 2, 4]
        }
        ]
      });
      await controller.getPulse(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        x_axis: ['Jan', 'Feb', 'Mar', 'Apr'],
        y_axis: [{
          name: 'Terrible',
          data: [1, 2, 3, 5]
        },
        {
          name: 'Ok',
          data: [1, 3, 5, 1]
        },
        {
          name: 'Good',
          data: [2, 4, 2, 4]
        }
        ]
      });
    });
    it('should return 500 status code and error message when system error is thrown', async () => {
      const req = {
        query: { viewer: 'user1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(services, 'getPulse').mockRejectedValue(new Error('Internal Server Error'));
      await controller.getPulse(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
});