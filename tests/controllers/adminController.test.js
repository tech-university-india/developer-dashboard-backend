const adminController = require('../../src/controllers/adminController');
const adminService = require('../../src/services/admin');

describe('adminController', () => {
  it('should return 201 and created user if the user is created', async () => {
    jest.spyOn(adminService, 'createUser').mockResolvedValue({ fmno: 'fmno', firstname: 'firstname' });
    const req = { body: { fmon: 'fmno', firstname: 'firstname' } };

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await adminController.createUser(req, res);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ fmno: 'fmno', firstname: 'firstname' });
  });
  it('should return 500 and error message if the user is not created', async () => {
    jest.spyOn(adminService, 'createUser').mockRejectedValue(new Error('error'));
    const req = { body: { fmon: 'fmno', firstname: 'firstname' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await adminController.createUser(req, res);
    expect(res.status).toBeCalledWith(500);
    expect(res.status().json).toBeCalledWith({ status: 500, message: 'error' });
  });

});