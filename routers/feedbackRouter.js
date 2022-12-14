const express = require('express');
const feedBackController = require("../mongoDB/controllers/feedbackController");
const feedbackRouter = express.Router();

feedbackRouter.post('/emailCheck', feedBackController.isEmailExists);
feedbackRouter.get('/', feedBackController.getFeedbacks);
feedbackRouter.get('/:mail', feedBackController.getFeedbackByMail);
feedbackRouter.post('/:mail/feedback', feedBackController.setFeedback);
feedbackRouter.delete('/:mail/feedback', feedBackController.deleteFeedback);
feedbackRouter.get('/feedback/age/:age', feedBackController.getFeedbackByAge);
feedbackRouter.get('/feedback/gender/:gender', feedBackController.getFeedbackByGender);
feedbackRouter.get('/feedback/occupation/:occupation', feedBackController.getFeedbackByOccupation);

module.exports = feedbackRouter;