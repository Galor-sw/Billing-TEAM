const Feedback = require('../models/feedback');
const serverLogger = require(`../../logger.js`);
const {addRow, deleteRow} = require("../../googleSheets/googleSheets");
const counterController = require("./counterController");
const logger = serverLogger.log;
const mailConfirmation = require('../../Growth-TeamAPI/ConfirmationEmail')

exports.isEmailExists = (req, res) => {
    Feedback.findOne({'email': req.body.mail})
        .then(result => {
            if (result) {
                res.send("The email exists");
            } else {
                res.send("The email does not exist, try again")
            }
        })
        .catch(err => logger.error(err));
};


exports.getFeedbacksAmount = (req, res) => {
    Feedback.count({})
        .then(amount => {
            //Change it for returning this amount
            console.log('The total amount of feedbacks is: ' + amount);
        })
        .catch(err => {
            console.log(err => logger.error(err))
        })
}

// handle the function instead of console.log
exports.getFeedbacks = (req, res) => {
    Feedback.find({})
        .then(docs => {
            console.log(JSON.stringify(docs));
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
                    // logger is ok here? we should send more data?
                    logger.error(err)
                    res.send("The feedback wasn't added");
                });

            counterController.updateCounter();
            mailConfirmation.confirmationSend(feedbackString);

        })
        .catch(err => {
            // logger is ok here? we should send more data?
            logger.error(err)
        })
};

exports.deleteFeedback = (req, res) => {
    Feedback.deleteOne({email: req.params.mail})
        .then(docs => {
            if (docs.deletedCount != 0) { // Need to add async in order to find the result
                const result = deleteRow(req.params.mail);
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
            // logger is ok here? we should send more data?
            logger.error(err);
        });
};

exports.getFeedbackByLowerAge = (req, res) => {
    Feedback.find({'metaData.age': {$lte: req.params.age}})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => logger.error(err));
};

exports.getFeedbackByHigherAge = (req, res) => {
    Feedback.find({'metaData.age': {$gte: req.params.age}})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => logger.error(err));
};

exports.getFeedbackByEqualAge = (req, res) => {
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

// This function is not ready yet - I've asked David on slack what is the purpose of it.
exports.getFeedbackByOccupation = (req, res) => {
    Feedback.find({'metaData.occupation': req.params.occupation})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => logger.error(err));
};
