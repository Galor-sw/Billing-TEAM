const { Router } = require('express');
const userController= require("../controllers/userController");
const userRouter = new Router();


userRouter.post('/', userController.emailCheck);

module.exports = {userRouter};


