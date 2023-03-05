const services = require('../../src/services/teamServices');
const controller = require('../../src/controllers/teamController');
const httpErrors = require('../../errors/httpErrors');
describe('Team Controller', () => {
  describe('addMember', () => {
    it('should add a member to the project', async () => {
      jest.spyOn(services, 'addMember').mockResolvedValue([
        { project_id: 'abc', username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 },
      ]);
      const req = {
        query: { project_id: 'abc' },
        body: { team_members: [{ username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }] },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.addMember(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith([
        { project_id: 'abc', username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 },
      ]);
    });
    it('should throw internal server error when there is some error at server side', async () => {
      jest.spyOn(services, 'addMember').mockRejectedValue(new Error('Internal Server Error'));
      const req = { body: { project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.addMember(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
    it('should throw http error in case of bad request', async () => {
      jest.spyOn(services, 'addMember').mockRejectedValue(new httpErrors('Bad Request', 400));
      const req = {
        query: { project_id: 'abc' },
        body: { team_members: [{ username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }] },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.addMember(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Bad Request' });
    });
  });
  describe('getTeam', () => {
    it('should get the team of the project', async () => {
      jest.spyOn(services, 'getTeam').mockResolvedValue([
        { project_id: 'abc', username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 },
      ]);
      const req = { query: { project_id: 'abc' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.getTeam(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { project_id: 'abc', username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 },
      ]);
    });
    it('should throw http error in case of bad request', async () => {
      jest.spyOn(services, 'getTeam').mockRejectedValue(new httpErrors('Bad Request', 400));
      const req = { query: { project_id: 'abc' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.getTeam(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Bad Request' });
    });
    it('should throw internal server error when there is some error at server side', async () => {
      jest.spyOn(services, 'getTeam').mockRejectedValue(new Error('Internal Server Error'));
      const req = { body: { project_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.getTeam(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  describe('updateMember', () => {
    it('should update the member of the project', async () => {
      jest.spyOn(services, 'updateMember').mockResolvedValue([
        { project_id: 'abc', username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 },
      ]);
      const req = {
        query: { project_id: 'abc' },
        body: { team_members: [{ username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }] },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.updateMember(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { project_id: 'abc', username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 },
      ]);
    });
    it('should throw internal server error when there is some error at server side', async () => {
      jest.spyOn(services, 'updateMember').mockRejectedValue(new Error('Internal Server Error'));
      const req = {
        query: { project_id: 'abc' },
        body: { team_members: [{ username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }] },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.updateMember(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
    it('should throw http error in case of bad request', async () => {
      jest.spyOn(services, 'updateMember').mockRejectedValue(new httpErrors('Bad Request', 400));
      const req = {
        query: { project_id: 'abc' },
        body: { team_members: [{ username: 'Balkar', role: 'frontend', start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }] },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.updateMember(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Bad Request' });

    });
  });
});