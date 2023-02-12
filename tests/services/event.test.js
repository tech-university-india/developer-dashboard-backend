const db = require('../../src/models');
const eventService = require('../../src/services/event');

describe('Event Service', () => {
  describe('createEvent', () => {
    it('should create an event', async () => {
      jest.spyOn(db.project_events, 'create').mockResolvedValue({
        event_id: 1,
        project_id: 1,
        event_name: 'Test Event',
        start_date: '2021-01-01',
        end_date: '2021-01-01',
      });

      const result = await eventService.createEvent(
        1,
        1,
        'Test Event',
        '2021-01-01',
        '2021-01-01'
      );
      expect(result).toEqual({
        event_id: 1,
        project_id: 1,
        event_name: 'Test Event',
        start_date: '2021-01-01',
        end_date: '2021-01-01',
      });
    });

    it('should throw an error when event is not created', async () => {
      jest.spyOn(db.project_events, 'create').mockRejectedValue(new Error('Error'));
      
      const result = eventService.createEvent(
        1,
        1,
        'Test Event',
        '2021-01-01',
        '2021-01-01'
      );
      expect(result).rejects.toThrow('Error');
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      jest.spyOn(db.project_events, 'destroy').mockResolvedValue([1]);

      const result = await eventService.deleteEvent(1);
      expect(result).toEqual([1]);
    });

    it('should throw an error when event is not deleted', async () => {
      jest.spyOn(db.project_events, 'destroy').mockRejectedValue(new Error('Error'));
      
      const result = eventService.deleteEvent(1);
      expect(result).rejects.toThrow('Error');
    });
  });

  describe('getEvents', () => {
    it('should get events for a projectId', async () => {
      jest.spyOn(db.project_events, 'findAll').mockResolvedValue([
        {
          event_id: 1,
          project_id: 1,
          event_name: 'Test Event',
          start_date: '2021-01-01',
          end_date: '2021-01-01',
        },
        {
          event_id: 2,
          project_id: 1,
          event_name: 'Test Event 2',
          start_date: '2021-01-01',
          end_date: '2021-01-01',
        },
      ]);

      const result = await eventService.getEvents(1);
      expect(result).toEqual([
        {
          event_id: 1,
          project_id: 1,
          event_name: 'Test Event',
          start_date: '2021-01-01',
          end_date: '2021-01-01',
        },
        {
          event_id: 2,
          project_id: 1,
          event_name: 'Test Event 2',
          start_date: '2021-01-01',
          end_date: '2021-01-01',
        },
      ]);
    });

    it('should throw an error when events are not retrieved', async () => {
      jest.spyOn(db.project_events, 'findAll').mockRejectedValue(new Error('Error'));
      
      const result = eventService.getEvents(1);
      expect(result).rejects.toThrow('Error');
    });
  });

  describe('updateEvent', () => {
    it('should update an event', async () => {
      jest.spyOn(db.project_events, 'update').mockResolvedValue([
        1,
        [
          {
            event_id: 1,
            project_id: 1,
            event_name: 'Test Event',
            start_date: '2021-01-01',
            end_date: '2021-01-01',
          },
        ],
      ]);

      const result = await eventService.updateEvent(1, {
        start_date: '2021-01-01',
        end_date: '2021-01-01',
      });
      expect(result).toEqual([
        1,
        [
          {
            event_id: 1,
            project_id: 1,
            event_name: 'Test Event',
            start_date: '2021-01-01',
            end_date: '2021-01-01',
          },
        ],
      ]);
    });

    it('should throw an error when event is not updated', async () => {
      jest.spyOn(db.project_events, 'update').mockRejectedValue(new Error('Error'));
      
      const result = eventService.updateEvent(1, {
        event_id: 1,
        project_id: 1,
        event_name: 'Test Event',
        start_date: '2021-01-01',
        end_date: '2021-01-01',
      });
      expect(result).rejects.toThrow('Error');
    });
  });
});