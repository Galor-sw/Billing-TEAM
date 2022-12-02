const express = require('express');
const feedBackController= require("../controllers/feedbackController");
const feedbackRouter = express.Router();

feedbackRouter.get('/:mail',feedBackController.getFeedback);

feedbackRouter.post('/:mail/feedback', feedBackController.createFeedback);

module.exports = feedbackRouter;
