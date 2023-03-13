const validateTeam = require('../../src/middlewares/teamValidator');

describe('Team Validator', () => {
  describe('teamValidator', () => {
    it('should throw bad request error when any of the fields is not valid', () => {
      const req = {
        query: { project_id: 'abc' },
        body: { team_members: [{ username: 12, role: 'frontend', key_member: false, start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }] },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.teamValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'error': '"[0].username" must be a string' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should call next when all the fields are valid', () => {
      const req = {
        query: { project_id: 'abc' },
        body: { team_members: [{ username: 'Balkar', role: 'frontend', key_member: false, start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }] },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.patchValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });


  });
  describe('updateTeamValidator', () => {
    it('should throw bad request error when any of the fields is not valid', () => {
      const req = {
        query: { project_id: 'abc' },
        body: { team_members: [{ username: 12, role: 'frontend', cost: 2000 }] },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.patchValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'error': '"[0].username" must be a string' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should call next when all the fields are valid', () => {
      const req = {
        query: { project_id: 'abc' },
        body: { team_members: [{ username: 'Balkar', role: 'frontend', key_member: false, start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }] },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.patchValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });


  });
});