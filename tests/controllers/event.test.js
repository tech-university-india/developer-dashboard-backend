const eventController = require("../../src/controllers/eventController");
const eventService = require("../../src/services/event");

describe("Event Controller", () => {
  
  describe("createEvent", () => {
    it("should return 201 status code when event is created", async () => {
      jest.spyOn(eventService, "createEvent").mockResolvedValue({
        eventId: 1,
        projectId: 1,
        eventName: "Test Event",
        startDate: "2021-01-01",
        endDate: "2021-01-01",
      });

      const mockReq = {
        body: {
          eventId: 1,
          projectId: 1,
          eventName: "Test Event",
          startDate: "2021-01-01",
          endDate: "2021-01-01",
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await eventController.createEvent(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({
        status: 201,
        data: {
          eventId: 1,
          projectId: 1,
          eventName: "Test Event",
          startDate: "2021-01-01",
          endDate: "2021-01-01",
        },
        message: "Succesfully Created Event",
      });
    });

    it("should return 500 status code when event is not created", async () => {
      jest.spyOn(eventService, "createEvent").mockRejectedValue(new Error("Error"));

      const mockReq = {
        body: {
          eventId: 1,
          projectId: 1,
          eventName: "Test Event",
          startDate: "2021-01-01",
          endDate: "2021-01-01",
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await eventController.createEvent(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: "Error"
      });
    }); 
  });

  describe("getEvents", () => {
    it("should return 200 status code when events with projectId exists", async () => {
      jest.spyOn(eventService, "getEvents").mockResolvedValue([
        {
          eventId: 1,
          projectId: 1,
          eventName: "Test Event",
          startDate: "2021-01-01",
          endDate: "2021-01-01"
        },
        {
          eventId: 2,
          projectId: 1,
          eventName: "Test Event 2",
          startDate: "2021-01-01",
          endDate: "2021-01-01"
        }
      ]);

      const mockReq = {
        params: {
          projectId: 1,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await eventController.getEvents(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        status: 200,
        data: [
          {
            eventId: 1,
            projectId: 1,
            eventName: "Test Event",
            startDate: "2021-01-01",
            endDate: "2021-01-01"
          },
          {
            eventId: 2,
            projectId: 1,
            eventName: "Test Event 2",
            startDate: "2021-01-01",
            endDate: "2021-01-01"
          }
        ],
        message: "Succesfully Events Recieved",
      });
    });

    it("should return 404 status code when events with projectId does not exist", async () => {
      jest.spyOn(eventService, "getEvents").mockResolvedValue([]);

      const mockReq = {
        params: {
          projectId: 1,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await eventController.getEvents(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({
        status: 404,
        message: "Events Not Found",
      });
    });

    it("should return 500 status code when error occurs", async () => {
      jest.spyOn(eventService, "getEvents").mockRejectedValue(new Error("Error"));

      const mockReq = {
        params: {
          projectId: 1,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await eventController.getEvents(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: "Error",
      });
    });
  });

  describe("deleteEvent", () => {
    it("should return 200 status code when the event exists", async () => {
      jest.spyOn(eventService, "deleteEvent").mockResolvedValue([1]);
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await eventController.deleteEvent(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        status: 200,
        data: [1],
        message: "Succesfully Deleted Event",
      });
    });

    it("should return 404 status code when the event does not exist", async () => {
      jest.spyOn(eventService, "deleteEvent").mockResolvedValue([0]);
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await eventController.deleteEvent(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({
        status: 404,
        message: "Event Not Found",
      });
    });

    it("should return 500 status code when error occurs", async () => {
      jest.spyOn(eventService, "deleteEvent").mockRejectedValue(new Error("Error"));
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await eventController.deleteEvent(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: "Error",
      });
    });
  });
});