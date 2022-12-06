const express = require('express');
const feedBackController = require("../mongoDB/controllers/feedbackController");
const feedbackRouter = express.Router();

feedbackRouter.get('/:mail', feedBackController.getFeedbackByMail);

feedbackRouter.post('/:mail/feedback', feedBackController.setFeedback);
feedbackRouter.delete('/:mail/feedback', feedBackController.deleteFeedback);

module.exports = feedbackRouter;