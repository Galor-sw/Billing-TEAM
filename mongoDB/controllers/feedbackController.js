const Feedback = require('../models/feedback')

exports.feedbackDbController = {
    getFeedbacks(req, res) {
        Feedback.find({})
            .then(docs => {
                console.log(JSON.stringify(docs));
            })
            .catch(err => console.log(err));
    }
}