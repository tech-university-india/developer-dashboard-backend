
const Router = require("express").Router();
const { getUsers, createUsers, checkAuth } = require("../controllers/dashController");

Router.get("/users", getUsers);
Router.post("/users/create", createUsers);
Router.post("/users/auth", checkAuth);

module.exports = Router;
