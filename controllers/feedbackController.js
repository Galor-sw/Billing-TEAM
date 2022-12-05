const json = require("../saveFeedback/json_save");
const {addRow, deleteRow} = require("../googleSheets/googleSheets");
const logger = require("../logger.js");
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
exports.deleteFeedback = async (req, res) => {
    const result = await deleteRow(req.params.mail);
    if (result === 'success') {
        serLogger.info('Row deleted from google sheet successfully');
        res.send("The feedback was deleted");
    } else {
        res.send("The feedback wasn't deleted");
    }
}