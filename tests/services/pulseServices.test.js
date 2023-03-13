const services = require('../../src/services/pulseServices');
const db = require('../../src/models/index');
// const utils = require('../../src/utils/pulseMapper');

describe('Pulse Services', () => {
  describe('addPulse', () => {
    it('should throw an error when already reported this month', async () => {
      jest.spyOn(db.pulse_score, 'findOne').mockResolvedValue({ dataValues: { createdAt: new Date() } });
      await expect(services.addPulse('project_id', 'username', 'pulse')).rejects.toThrow('Pulse already reported for this month');
    });
    it('should create a new pulse', async () => {
      jest.spyOn(db.pulse_score, 'findOne').mockResolvedValue(null);
      jest.spyOn(db.pulse_score, 'create').mockResolvedValue({ message: 'Pulse reported successfully' });
      await expect(services.addPulse('project_id', 'username', 'pulse')).resolves.toEqual({ message: 'Pulse reported successfully' });
    });
  });
  // describe('getPulse', () => {
  //   it('should return the pulse map', async () => {
  //     jest.spyOn(db.teams, 'findAll').mockResolvedValue([{ dataValues: { project_id: 'project_id' } }]);
  //     jest.spyOn(db.pulse_score, 'findAll').mockResolvedValue([{ dataValues: { score: 'score', createdAt: new Date() } }]);
  //     jest.spyOn(utils, 'getPulseMap').mockReturnValue([{
  //       name: 'Terrible',
  //       data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //     }, {
  //       name: 'Ok',
  //       data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //     }, {
  //       name: 'Good',
  //       data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //     }
  //     ]
  //     );
  //     await expect(services.getPulse('project_id')).resolves.toBe({
  //       x_axis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //       y_axis: [{
  //         name: 'Terrible',
  //         data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //       }, {
  //         name: 'Ok',
  //         data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //       }, {
  //         name: 'Good',
  //         data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //       }
  //       ]
  //     });

  //   });
  // });
});