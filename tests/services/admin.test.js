
// Testing DB data creation
const adminService = require('../../src/services/admin');
const db = require('../../src/models/index');
const { it } = require('node:test');

describe('AdminService', () => {
  describe('createUser', () => {
    it('Should return created user', async () => {
      jest.spyOn(db.user, 'create').mockResolvedValue({
        'id': 0,
        'username': 'ashutosh_senapati',
        'email': 'ashutosh_senapati@mckinsey.com',
        'role': 'Admin',
        'phoneno': '9777139671',
        'fmno': 328533,
        'firstname': 'Ashutosh',
        'lastname': 'Senapati',
        'github': 'github.com/ashutoshmck',
        'createdAt': '2023-02-16T19:27:09Z',
        'updatedAt': '2023-02-16T19:27:09Z'
      });
      const user = await adminService.createUser('ashutosh_senapati', 328533, 'Ashutosh', 'Senapati', 'ashutosh_senapati@mckinsey.com', '9777139671', 'Admin', 'ashutoshmck');
      expect(user).toBeEqual({
        'id': 0,
        'username': 'ashutosh_senapati',
        'email': 'ashutosh_senapati@mckinsey.com',
        'role': 'Admin',
        'phoneno': '9777139671',
        'fmno': 328533,
        'firstname': 'Ashutosh',
        'lastname': 'Senapati',
        'github': 'github.com/ashutoshmck',
        'createdAt': '2023-02-16T19:27:09Z',
        'updatedAt': '2023-02-16T19:27:09Z'
      });
    });
  });
});
