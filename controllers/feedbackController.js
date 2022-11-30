const json = require("../saveFeedback/json_save");
const {addRow} = require("../googleSheets/googleSheets");
const logger = require("../logger.js");
const url = require("url");
let serLogger = logger.log;

module.exports = {
//create
     createFeedback : (req,res) => {
         console.log("createFeedback: "+req.body);
        // let feedbackString = JSON.parse(req.body);
        // if (json.writeFeedBack(JSON.parse(feedbackString)) === 'success') {
        //     addRow(req.body).then(r => (serLogger.info('Row added to google sheet successfully')));
        //     res.send("The feedback was added");
        // } else {
        //     res.send("The feedback wasn't added");
        // }
    },
//read
     getFeedback : (req,res) => {
        let feedBack = json.isHaveFeedBack(req.params.mail);
        if (feedBack != '') {
            console.log(JSON.stringify(feedBack));
            res.send(JSON.stringify(feedBack));
        } else {
            res.send("The user hasn't given a feedback yet");
        }
    }


}



