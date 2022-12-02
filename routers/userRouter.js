const express = require('express');
const userRouter = express.Router();
const userController= require("../controllers/userController");
// const userRouter = new express();

userRouter.post('/'+userController.emailCheck);

module.exports = userRouter;


