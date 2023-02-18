const validateTeam = require('../../src/middlewares/teamValidator');

describe('Team Validator', () => {
  describe('teamValidator', () => {
    it('should throw bad request error when project_id is not valid', () => {
      const req = { body: { project_id: 123, username: 'Balkar', adder_role: 'manager', emp_role: 'Developer', emp_status: 'active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.teamValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'error': '"project_id" must be a string' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should throw bad request error when username is not valid', () => {
      const req = { body: { project_id: '123', username: 123, adder_role: 'manager', emp_role: 'Developer', emp_status: 'active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.teamValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'error': '"username" must be a string' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should throw erro when emp_role is not valid', () => {
      const req = { body: { project_id: '123', username: 'Balkar', adder_role: 'manager', emp_role: 12, emp_status: 'active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.teamValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'error': '"emp_role" must be a string' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should throw error when adder_role is not valid', () => {
      const req = { body: { project_id: '123', username: 'Balkar', adder_role: 'developer', emp_role: 'Developer', emp_status: 'active' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.teamValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'error': '"adder_role" must be one of [manager, supermanager]' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should call next when all the fields are valid', () => {
      const req = { body: { project_id: '123', username: 'Balkar', adder_role: 'manager', emp_role: 'Developer' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.teamValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('getTeamValidator', () => {
    it('should throw bad request error when project_id is not valid', () => {
      const req = { body: { project_id: 123, key: 'all', value: 'abc' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.getTeamValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'error': '"project_id" must be a string' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should throw bad request error when key is not valid', () => {
      const req = { body: { project_id: '123', key: 'abc', value: 'abc' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.getTeamValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'error': '"key" must be one of [username, emp_status, role, all]' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should throw bad request error when value is not valid for specific key', () => {
      const req = { body: { project_id: '123', key: 'role', value: 'abc' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.getTeamValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'error': '"value" must be one of [developer, manager, supermanager]' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should call next when all the fields are valid', () => {
      const req = { body: { project_id: '123', key: 'all', value: 'abc' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateTeam.getTeamValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});