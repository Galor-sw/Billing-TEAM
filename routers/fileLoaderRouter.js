const { Router } = require('express');
const fileLoaderController= require("../controllers/fileLoaderController");
const fileLoaderRouter = new Router();

fileLoaderRouter.get('/', fileLoaderController.loadLoginFile);
fileLoaderRouter.get('/loginAndForm/form.html', fileLoaderController.loadFormFile);

module.exports = {fileLoaderRouter};
