const Feedback = require('../models/feedback');
const serverLogger = require(`../../logger.js`);
const {addRow, deleteRow} = require("../../googleSheets/googleSheets");
const counterController = require("./counterController");
const {syncIndexes} = require("mongoose");
const logger = serverLogger.log;
const mailConfirmation = require('../../Growth-TeamAPI/ConfirmationEmail')
const URL = process.env.URL;

exports.isEmailExists = (req, res) => {
    Feedback.findOne({'email': req.body.mail})
        .then(result => {
            if (result) {
                res.send("The email exist");
            } else {
                res.send("The email does not exist, try again");
            }
        })
        .catch(err => logger.error(err));
};


exports.getFeedbacks = (req, res) => {
    Feedback.find({})
        .then(docs => {
            res.send(JSON.stringify(docs));
        })
        .catch(err => logger.error(err));
};

exports.getFeedbackByMail = (req, res) => {
    Feedback.findOne({'email': req.params.mail})
        .then(feedback => {
            if (feedback) {
                res.send(JSON.stringify(feedback));
            } else {
                res.send("The user hasn't given a feedback yet")
            }
        })
        .catch(err => logger.error(err));
};

exports.setFeedback = (req, res) => {
    const feedbackString = JSON.parse(JSON.stringify(req.body));

    Feedback.deleteOne({email: feedbackString.email})
        .then(docs => {
            const newFeedback = new Feedback({
                "email": feedbackString.email,
                "free_text": feedbackString.free_text,
                "rate": feedbackString.rate,
                "answers": [{
                    "recommend": feedbackString.answers.recommend,
                    "choose_again": feedbackString.answers.choose_again,
                    "improvement": feedbackString.answers.improvement,
                    "customer_support": feedbackString.answers.customer_support,
                }],
                "metaData": [{
                    age: feedbackString.metaData.age,
                    gender: feedbackString.metaData.gender,
                    occupation: feedbackString.metaData.occupation,
                }]
            });

            newFeedback.save()
                .then(docs => {
                    addRow(req.body).then(() => (logger.info('Row added to google sheet successfully')));
                    res.send("The feedback was added");
                })
                .catch(err => {
                    logger.error(err)
                    res.send("The feedback wasn't added");
                });

            counterController.updateCounter();
            mailConfirmation.confirmationSend(feedbackString);

        })
        .catch(err => {
            logger.error("The feedback was not updated : " + err);
        })
};

exports.deleteFeedback = (req, res) => {
    Feedback.deleteOne({email: req.params.mail})
        .then(async (docs) => {
            if (docs.deletedCount != 0) {
                const result = await deleteRow(req.params.mail);
                if (result == 'success') {
                    logger.info('Row deleted from google sheet successfully');
                    res.send("The feedback was deleted");
                } else {
                    res.send("The feedback wasn't deleted");
                }
            } else {
                res.send("There isn't any feedback to delete");
            }
        })
        .catch(err => {
            logger.error(err);
        });
};

exports.getFeedbackByAge = (req, res) => {
    Feedback.find({'metaData.age': req.params.age})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => logger.error(err));
};

exports.getFeedbackByGender = (req, res) => {
    Feedback.find({'metaData.gender': req.params.gender})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => logger.error(err));
};

exports.getFeedbackByOccupation = (req, res) => {
    Feedback.find({'metaData.occupation': req.params.occupation})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => logger.error(err));
};
