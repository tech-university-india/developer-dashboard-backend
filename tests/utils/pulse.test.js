const { getPulseMap } = require('../../src/utils/pulseMapper');
const { sendMail } = require('../../src/utils/pulseMailer');
const { user, teams } = require('../../src/models/');

describe('Pulse Utils', () => {
  describe('Pulse Mailer', () => {
    it('should send the mail to all the users in the team', async () => {
      jest.spyOn(teams, 'findAll').mockResolvedValue([{ dataValues: { project_id: 'project_id' } }]);
      jest.spyOn(user, 'findAll').mockResolvedValue([{ dataValues: { email: 'email' } }]);
      jest.mock('sib-api-v3-sdk', () => {
        return {
          TransactionalEmailsApi: jest.fn().mockImplementation(() => {
            return {
              sendTransacEmail: jest.fn().mockImplementation(() => {
                return Promise.resolve();
              })
            };
          })
        };
      });
    });
    expect(sendMail()).resolves.toBeUndefined();
  });
  describe('Pulse Mapper', () => {
    it('should return a map of pulse data', () => {
      const pulseData = [
        {
          'pulse': 1,
          'createdAt': '2020-01-01T00:00:00.000Z'
        },
        {
          'pulse': 2,
          'createdAt': '2020-02-01T00:00:00.000Z'
        },
        {
          'pulse': 3,
          'createdAt': '2020-03-01T00:00:00.000Z'
        },
        {
          'pulse': 4,
          'createdAt': '2020-04-01T00:00:00.000Z'
        },
        {
          'pulse': 5,
          'createdAt': '2020-05-01T00:00:00.000Z'
        },
        {
          'pulse': 1,
          'createdAt': '2020-06-01T00:00:00.000Z'
        },
        {
          'pulse': 2,
          'createdAt': '2020-07-01T00:00:00.000Z'
        },
        {
          'pulse': 3,
          'createdAt': '2020-08-01T00:00:00.000Z'
        },
        {
          'pulse': 4,
          'createdAt': '2020-09-01T00:00:00.000Z'
        },
        {
          'pulse': 5,
          'createdAt': '2020-10-01T00:00:00.000Z'
        },
        {
          'pulse': 1,
          'createdAt': '2020-11-01T00:00:00.000Z'
        },
        {
          'pulse': 2,
          'createdAt': '2020-12-01T00:00:00.000Z'
        }
      ];
      const expected = [
        {
          'name': 'Terrible',
          'data': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          'name': 'Ok',
          'data': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          'name': 'Good',
          'data': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
      ];
      const result = getPulseMap(pulseData);
      expect(result).toEqual(expected);
    });
  });
});