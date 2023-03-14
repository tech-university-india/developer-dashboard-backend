const services = require('../../src/services/pulseServices');
const db = require('../../src/models/index');

describe('Pulse Services', () => {
  describe('addPulse', () => {
    it('should throw an error when invalid user', async () => {
      jest.spyOn(db.teams, 'findOne').mockResolvedValue(null);
      await expect(services.addPulse('project_id', 'username', 'pulse')).rejects.toThrow('Invalid user');
    });
    it('should throw an error when already reported this month', async () => {
      jest.spyOn(db.teams, 'findOne').mockResolvedValue({ dataValues: { project_id: 'project_id' } });
      jest.spyOn(db.pulse_score, 'findOne').mockResolvedValue({ dataValues: { createdAt: new Date() } });
      await expect(services.addPulse('project_id', 'username', 'pulse')).rejects.toThrow('Pulse already reported for this month');
    });
    it('should create a new pulse', async () => {
      jest.spyOn(db.teams, 'findOne').mockResolvedValue({ dataValues: { project_id: 'project_id' } });
      jest.spyOn(db.pulse_score, 'findOne').mockResolvedValue(null);
      jest.spyOn(db.pulse_score, 'create').mockResolvedValue({ message: 'Pulse reported successfully' });
      await expect(services.addPulse('project_id', 'username', 'pulse')).resolves.toEqual({ message: 'Pulse reported successfully' });
    });
  });
  describe('getPulse', () => {
    it('should return empty array when no projects', async () => {
      jest.spyOn(db.teams, 'findAll').mockResolvedValue([]);
      await expect(services.getPulse('viewer')).resolves.toEqual({
        x_axis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], y_axis: [
          { name: 'Terrible', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: 'Ok', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: 'Good', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        ]
      });
    });

  });
});