const express = require('express')
const counterRouter = express.Router();
const counterController = require("../mongoDB/controllers/counterController");

counterRouter.get('/', counterController.getCounter);

module.exports = counterRouter;