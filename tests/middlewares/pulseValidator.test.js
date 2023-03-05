const validator = require('../../src/middlewares/pulseValidator');

describe('Pulse Validator', () => {
  describe('addPulseValidator', () => {
    it('should throw bad request error when project_id is not valid', () => {
      const req = { body: { project_id: 123, username: 'Balkar', pulse: 123 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validator.addPulseValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'message': '"project_id" must be a string' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should throw bad request error when username is not valid', () => {
      const req = { body: { project_id: '123', username: 123, pulse: 123 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validator.addPulseValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'message': '"username" must be a string' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should throw bad request error when pulse is not valid', () => {
      const req = { body: { project_id: '123', username: 'Balkar', pulse: '123a' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validator.addPulseValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'message': '"pulse" must be a number' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should call next when all the fields are valid', () => {
      const req = { body: { project_id: '123', username: 'Balkar', pulse: 123 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validator.addPulseValidator(req, res, next);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.status().json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('getPulseValidator', () => {
    it('should throw bad request error when viewer is not valid', () => {
      const req = { query: { viewer: 123 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validator.getPulseValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status().json).toHaveBeenCalledWith({ 'message': '"viewer" must be a string' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should call next when all the fields are valid', () => {
      const req = { query: { viewer: 'Balkar' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validator.getPulseValidator(req, res, next);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.status().json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});