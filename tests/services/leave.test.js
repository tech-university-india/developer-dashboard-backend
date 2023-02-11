const db = require('../../src/models');
const leaveService = require('../../src/services/leave');

describe('Leave Service', () => {
  describe('createLeave', () => {
    it('should create a leave', async () => {
      jest.spyOn(db.user_leaves, 'create').mockResolvedValue({
        username: 'test user',
        start_date: '2021-01-01',
        end_date: '2021-01-01',
      });

      const result = await leaveService.createLeave(
        'test user',
        '2021-01-01',
        '2021-01-01'
      );
      expect(result).toEqual({
        username: 'test user',
        start_date: '2021-01-01',
        end_date: '2021-01-01',
      });
    });

    it('should throw an error when leave is not created', async () => {
      jest.spyOn(db.user_leaves, 'create').mockRejectedValue(new Error('Error'));

      const result = leaveService.createLeave(
        'test user',
        '2021-01-01',
        '2021-01-01'
      );
      expect(result).rejects.toThrow('Error');
    });
  });

  describe('deleteLeave', () => {
    it('should delete a leave', async () => {
      jest.spyOn(db.user_leaves, 'destroy').mockResolvedValue([1]);

      const result = await leaveService.deleteLeave(1);
      expect(result).toEqual([1]);
    });

    it('should throw an error when leave is not deleted', async () => {
      jest.spyOn(db.user_leaves, 'destroy').mockRejectedValue(new Error('Error'));

      const result = leaveService.deleteLeave(1);
      expect(result).rejects.toThrow('Error');
    });
  });

  describe('getLeaves', () => {
    it('should get leaves', async () => {
      jest.spyOn(db.user_leaves, 'findAll').mockResolvedValue([{
        username: 'test user',
        start_date: '2021-01-01',
        end_date: '2021-01-01',
      }]);

      const result = await leaveService.getLeaves('test user');
      expect(result).toEqual([{
        username: 'test user',
        start_date: '2021-01-01',
        end_date: '2021-01-01',
      }]);
    });

    it('should throw an error when leaves are not retrieved', async () => {
      jest.spyOn(db.user_leaves, 'findAll').mockRejectedValue(new Error('Error'));

      const result = leaveService.getLeaves('test user');
      expect(result).rejects.toThrow('Error');
    });
  });
});

