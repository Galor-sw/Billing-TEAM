const express = require('express');
const fileLoaderController= require("../controllers/fileLoaderController");
const fileLoaderRouter = express.Router();

fileLoaderRouter.get('/'+fileLoaderController.loadLoginFile);
fileLoaderRouter.get('/loginAndForm/'+fileLoaderController.loadFormFile);
fileLoaderRouter.get('/loginAndForm/'+fileLoaderController.loadMessageFile);
module.exports = fileLoaderRouter;
