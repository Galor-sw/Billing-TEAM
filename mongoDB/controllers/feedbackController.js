const Feedback = require('../models/feedback')
const json = require("../../saveFeedback/json_save");
const serverlogger = require(`../../logger.js`);
const {addRow} = require("../../googleSheets/googleSheets");
let logger = serverlogger.log;

exports.feedbackDbController = {
    getFeedbacks(req, res) {
        Feedback.find({})
            .then(docs => {
                console.log(JSON.stringify(docs));
            })
            .catch(err => console.log(err));
    },

    getFeedbackByMail(req,res) {
        let mail = req.params.mail;
        Feedback.findOne({'email':mail})
            .then(docs => {
                res.send(JSON.stringify(docs));
            })
            .catch(err => logger.error(err));
    },
    setFeedback(req,res) {
        let feedbackString = JSON.stringify(req.body);
        console.log('Feedbackstring is:' +feedbackString);
        Feedback.insertMany(feedbackString)
            .then(docs => {
                // addRow(req.body).then(() => (logger.info('Row added to google sheet successfully')));
                res.send('The feedback was added');
        })
            .catch(err => logger.error(err));

        // if (json.writeFeedBack(JSON.parse(feedbackString)) === 'success') {
        //     addRow(req.body).then(() => (logger.info('Row added to google sheet successfully')));
        //     res.send("The feedback was added");
        // } else {
        //     res.send("The feedback wasn't added");
        // }


    }

}