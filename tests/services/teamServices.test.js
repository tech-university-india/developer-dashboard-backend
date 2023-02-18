const services = require('../../src/services/teamServices');
const db = require('../../src/models/index');
describe('Team Services', () => {
  describe('addMember', () => {
    it('should throw an error when there  is no username with given name', async () => {
      jest.spyOn(db.user, 'findOne').mockResolvedValue(null);
      await expect(services.addMember(1, 'Balkar', 'Developer', 'Active')).rejects.toThrow('Invalid username');
    });
    it('should throw an error when there is no project with given id', async () => {
      jest.spyOn(db.user, 'findOne').mockResolvedValue({ username: 'Balkar' });
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue(null);
      await expect(services.addMember(1, 'Balkar', 'Developer', 'Active')).rejects.toThrow('Invalid project id');
    });
    it('should throw an error when user is already a member of the project', async () => {
      jest.spyOn(db.user, 'findOne').mockResolvedValue({ username: 'Balkar' });
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findOne').mockResolvedValue({ username: 'Balkar' });
      await expect(services.addMember(1, 'Balkar', 'Developer', 'Active')).rejects.toThrow('User already a member of this project');
    });
    it('should add a member to the project', async () => {
      jest.spyOn(db.user, 'findOne').mockResolvedValue({ username: 'Balkar' });
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findOne').mockResolvedValue(null);
      jest.spyOn(db.teams, 'create').mockResolvedValue({ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' });
      await expect(services.addMember(1, 'Balkar', 'Developer', 'Active')).resolves.toEqual({ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' });
    });
  });
  describe('getTeam', () => {
    it('should throw an error when there is no project with given id', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue(null);
      await expect(services.getTeam(1, 'all')).rejects.toThrow('Invalid project id');
    });
    it('should throw an error when there is no employee with given status', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findAll').mockResolvedValue(null);
      await expect(services.getTeam(1, 'emp_status', 'Active')).rejects.toThrow('No employee with this status');
    });
    it('should throw an error when there is no employee with given role', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findAll').mockResolvedValue(null);
      await expect(services.getTeam(1, 'role', 'Developer')).rejects.toThrow('No employee with this role');
    });
    it('should throw an error when there is no employee with given username', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findOne').mockResolvedValue(null);
      await expect(services.getTeam(1, 'username', 'Balkar')).rejects.toThrow('No employee with this username');
    });
    it('should throw an error when there is no employee in the project', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findAll').mockResolvedValue(null);
      await expect(services.getTeam(1, 'all', 'abc')).rejects.toThrow('No employee in this project');
    });
    it('should return all employees in the project', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findAll').mockResolvedValue([{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]);
      await expect(services.getTeam(1, 'all')).resolves.toEqual([{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]);
    });
    it('should return all employees with given role in the project', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findAll').mockResolvedValue([{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]);
      await expect(services.getTeam(1, 'role', 'Developer')).resolves.toEqual([{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]);
    });
    it('should return all employees with given status in the project', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findAll').mockResolvedValue([{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]);
      await expect(services.getTeam(1, 'emp_status', 'Active')).resolves.toEqual([{ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' }]);
    });
    it('should return employee with given username in the project', async () => {
      jest.spyOn(db.project_details, 'findOne').mockResolvedValue({ project_id: 1 });
      jest.spyOn(db.teams, 'findOne').mockResolvedValue({ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' });
      await expect(services.getTeam(1, 'username', 'Balkar')).resolves.toEqual({ project_id: 1, emp_name: 'Balkar', username: 'Balkar', role: 'Developer', emp_status: 'Active' });
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