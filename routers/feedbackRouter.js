const express = require('express');
const feedBackController = require("../mongoDB/controllers/feedbackController");
const feedbackRouter = express.Router();

feedbackRouter.get('/:mail', feedBackController.feedbackDbController.getFeedbackByMail);

feedbackRouter.post('/:mail/feedback', feedBackController.feedbackDbController.setFeedback);
// feedbackRouter.delete('/:mail/feedback', feedBackController.deleteFeedback);

module.exports = feedbackRouter;