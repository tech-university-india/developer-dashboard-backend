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
  describe('updateMember', () => {
    it('should throw an error when there is no project with given id', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue(null);
      await expect(services.updateMember(1, 'Balkar', 'Developer', 'Active')).rejects.toThrow('Invalid project id');
    });
    it('should throw an error when there is no employee with given username', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.user, 'findOne').mockResolvedValue(null);
      await expect(services.updateMember(1, 'Balkar', 'Developer', 'Active')).rejects.toThrow('Invalid username');
    });
    it('should throw an error when there is no employee with given username', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.user, 'findOne').mockResolvedValue({ username: 'Balkar' });
      jest.spyOn(db.teams, 'findOne').mockResolvedValue(null);
      await expect(services.updateMember(1, 'Balkar', 'Developer', 'Active')).rejects.toThrow('No such member in this project');
    });
    it('should update employee with given username in the project', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findOne').mockResolvedValue({ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' });
      jest.spyOn(db.teams, 'update').mockResolvedValue([1, [{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]]);
      await expect(services.updateMember(1, 'Balkar', 'Developer', 'Active')).resolves.toEqual([1, [{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]]);
    });
    it('should update employee with given username in the project', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.user, 'findOne').mockResolvedValue({ username: 'Balkar' });
      jest.spyOn(db.teams, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'update').mockResolvedValue([1, [{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]]);
      await expect(services.updateMember(1, 'Balkar', 'Manager')).resolves.toEqual([1, [{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]]);
    });

  });
});