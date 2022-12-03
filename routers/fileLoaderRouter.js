const express = require('express');
const fileLoaderController= require("../controllers/fileLoaderController");
const fileLoaderRouter = express.Router();

fileLoaderRouter.get('/',fileLoaderController.loadLoginFile);

fileLoaderRouter.get('/loginAndForm/form.html', fileLoaderController.loadFormFile);

fileLoaderRouter.get('/loginAndForm/message.html',fileLoaderController.loadMessageFile);

module.exports = fileLoaderRouter;
