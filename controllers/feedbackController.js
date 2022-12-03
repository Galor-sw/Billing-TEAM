const json = require("../saveFeedback/json_save");
const {addRow} = require("../googleSheets/googleSheets");
const logger = require("../logger.js");
// const url = require("url");
let serLogger = logger.log;

//create
exports.createFeedback = (req, res) => {
    let feedbackString = JSON.stringify(req.body);
    if (json.writeFeedBack(JSON.parse(feedbackString)) === 'success') {
        addRow(req.body).then(() => (serLogger.info('Row added to google sheet successfully')));
        res.send("The feedback was added");
    } else {
        res.send("The feedback wasn't added");
    }
};
//read
exports.getFeedback = (req, res) => {
    let feedBack = json.isHaveFeedBack(req.params.mail);
    if (feedBack != '') {
        res.send(JSON.stringify(feedBack));
    } else {
        res.send("The user hasn't given a feedback yet");
    }
}