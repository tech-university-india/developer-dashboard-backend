const services = require('../../src/services/pulseServices');
const db = require('../../src/models/index');

describe('Pulse Services', () => {
  describe('getPulse', () => {
    it('should return a map of pulse data when pulse data is present', async () => {
      jest.spOn(db.teams, 'findAll').mockResolvedValue([{ project_id: 'project_id' }]);
      jest.spyOn(db.pulse, 'findAll').mockResolvedValue([{ pulse: 'pulse', createdAt: new Date() }]);
      await expect(services.getPulse('username')).resolves.toEqual({
        x_axis: ['Jan'],
        y_axis: [{ 'name': 'Terrible', 'data': [0] }, { 'name': 'Ok', 'data': [0] }, { 'name': 'Good', 'data': [0] }]
      });
    });
  });
  describe('addPulse', () => {
    it('should throw an error when already reported this month', async () => {
      jest.spyOn(db.pulse, 'findAll').mockResolvedValue({ createdAt: new Date() });
      await expect(services.addPulse('project_id', 'username', 'pulse')).rejects.toThrow('Pulse already reported for this month');
    });
    it(' should save the pulse successfully when not reported this month', async () => {
      jest.spyOn(db.pulse, 'findAll').mockResolvedValue({ createdAt: new Date() });
      jest.spyOn(db.pulse, 'create').mockResolvedValue({ id: 1 });
      await expect(services.addPulse('project_id', 'username', 'pulse')).resolves.toEqual({ message: 'Pulse reported successfully' });
    });
  });
});