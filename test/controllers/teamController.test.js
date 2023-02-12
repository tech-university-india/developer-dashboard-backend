const services = require('../../src/services/teamServices');
const controller = require('../../src/controllers/teamController');
const httpErrors = require('../../errors/httpErrors');
describe('Team Controller', () => {
  describe('addMember', () => {
    it('should throw bad request error when project_id is not valid', async () => {
      jest.spyOn(services, 'addMember').mockRejectedValue(new httpErrors('Invalid project_id', 400));
      const req = { body: { project_id: '1', emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.addMember(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid project_id' });
    });
    it('should throw bad request error when username is not valid', async () => {
      jest.spyOn(services, 'addMember').mockRejectedValue(new httpErrors('Invalid username', 400));
      const req = { body: { project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.addMember(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid username' });
    });
    it('should throw bad request error when role is not valid', async () => {
      jest.spyOn(services, 'addMember').mockRejectedValue(new httpErrors('Invalid role', 400));
      const req = { body: { project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.addMember(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid role' });
    });
    it('should throw bad request error when status is not valid', async () => {
      jest.spyOn(services, 'addMember').mockRejectedValue(new httpErrors('Invalid status', 400));
      const req = { body: { project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.addMember(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid status' });
    });

    it('should add a member to the project', async () => {
      jest.spyOn(services, 'addMember').mockResolvedValue({ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' });
      const req = { body: { project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.addMember(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' });
    });
    it('should throw internal server error when there is some error at server side', async () => {
      jest.spyOn(services, 'addMember').mockRejectedValue(new Error('Internal Server Error'));
      const req = { body: { project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.addMember(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  describe('getTeam', () => {
    it('should get the team of the project', async () => {
      jest.spyOn(services, 'getTeam').mockResolvedValue([{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]);
      const req = { body: { project_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.getTeam(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]);
    });
    it('should throw internal server error when there is some error at server side', async () => {
      jest.spyOn(services, 'getTeam').mockRejectedValue(new Error('Internal Server Error'));
      const req = { body: { project_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.getTeam(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
    it('should throw http error when project id is not valid', async () => {
      jest.spyOn(services, 'getTeam').mockRejectedValue(new httpErrors('Invalid project_id', 400));
      const req = { body: { project_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.getTeam(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid project_id' });
    });
    it('should throw http error when no member for specific role', async () => {
      jest.spyOn(services, 'getTeam').mockRejectedValue(new httpErrors('Invalid role', 400));
      const req = { body: { project_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.getTeam(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid role' });
    });
    it('should throw http error when no member for specific status', async () => {
      jest.spyOn(services, 'getTeam').mockRejectedValue(new httpErrors('Invalid status', 400));
      const req = { body: { project_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.getTeam(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid status' });
    });
    it('should throw http error when no member for specific username', async () => {
      jest.spyOn(services, 'getTeam').mockRejectedValue(new httpErrors('Invalid username', 400));
      const req = { body: { project_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.getTeam(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid username' });
    });
    it('should throw http error when no member for specific project id', async () => {
      jest.spyOn(services, 'getTeam').mockRejectedValue(new httpErrors('Invalid project_id', 400));
      const req = { body: { project_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.getTeam(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid project_id' });
    });


  });
});