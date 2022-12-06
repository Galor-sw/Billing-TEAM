const Feedback = require('../models/feedback')
const json = require("../../saveFeedback/json_save");
const serverlogger = require(`../../logger.js`);
const {addRow} = require("../../googleSheets/googleSheets");
const logger = serverlogger.log;

exports.getFeedbacksAmount = (req, res) => {
    Feedback.count({})
        .then(amount => {
            console.log(amount)
        })
        .catch(err => {
            console.log(err)
        })
}

// handle the function instead of console.log
exports.getFeedbacks = (req, res) => {
    Feedback.find({})
        .then(docs => {
            console.log(JSON.stringify(docs));
        })
        .catch(err => console.log(err));
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
        })
        .catch(err => {
            // logger is ok here? we should send more data?
            logger.error(err)
        })
};

exports.deleteFeedback = (req, res) => {
    Feedback.deleteOne({email: req.params.mail})
        .then(docs => {
            if (docs.deletedCount != 0) {
                res.send("The feedback was deleted");
            } else {
                res.send("There isn't any feedback to delete");
            }
        })
        .catch(err => {
            // logger is ok here? we should send more data?
            logger.error(err);
        });
};

const increaseCounter = () => {

}

