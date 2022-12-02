const express = require('express');
const chatController= require("../controllers/chatController");
const chatRouter = express.Router();


chatRouter.get('/:mail',chatController.startChat);

module.exports = chatRouter;


