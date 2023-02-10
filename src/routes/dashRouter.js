
const Router = require("express").Router();
const { getUsers, checkAuth } = require("../controllers/dashController");
const adminController = require("../controllers/adminController");
const { isAdmin } = require("../middleware/admin_access");
const leaveController = require("../controllers/leaveController");
const eventController = require("../controllers/eventController");

Router.get("/users", getUsers);
Router.route("/users/create").post(isAdmin, adminController.createUser);
Router.post("/users/auth", checkAuth);

Router.post("/leaves", leaveController.createLeave);
Router.delete("/leave/:id", leaveController.deleteLeave);

Router.post("/events", eventController.createEvent);
Router.get("/events/:projectId", eventController.getEvents);
Router.delete("/event/:id", eventController.deleteEvent);

module.exports = Router;
