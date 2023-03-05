const services = require('../../src/services/teamServices');
const db = require('../../src/models/index');
describe('Team Services', () => {
  describe('addMember', () => {
    it('should add the members to the project', async () => {
      jest.spyOn(db.teams, 'bulkCreate').mockResolvedValue([{ project_id: 'abc', username: 'Balkar', role: 'Developer', key_member: false, start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }]);
      const members = [{ project_id: 'abc', username: 'Balkar', role: 'Developer', key_member: false, start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }];
      const storedMembers = await services.addMember('abc', members);
      expect(storedMembers).toEqual(members);
    });
  });
  describe('getTeam', () => {
    it('should get the team of the project', async () => {
      jest.spyOn(db.teams, 'findAll').mockResolvedValue([{ project_id: 'abc', username: 'Balkar', role: 'Developer', key_member: false, start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }]);
      const teams = await services.getTeam('abc');
      expect(teams).toEqual([{ project_id: 'abc', username: 'Balkar', role: 'Developer', key_member: false, start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }]);
    });
  });
  describe('updateMember', () => {
    it('should update the team members', async () => {
      jest.spyOn(db.teams, 'update').mockResolvedValue([1]);
      jest.spyOn(db.teams, 'findAll').mockResolvedValue([{ project_id: 'abc', username: 'Balkar', role: 'Developer', key_member: false, start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }]);
      const team_members = [{ username: 'Balkar', role: 'Developer', key_member: false, start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }];
      const updatedMembers = await services.updateMember('abc', team_members);
      expect(updatedMembers).toEqual([{ project_id: 'abc', username: 'Balkar', role: 'Developer', key_member: false, start_date: '2020-01-01', end_date: '2020-01-01', cost: 2000 }]);
    });
  });
});