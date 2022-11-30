const fs = require("fs");
const json = require("./feedback.json");
// find if email exists
const isExists = (email) => {
    for (let i in json.users) {
        if (email === json.users[i].email) {
            return true;
        }
    }
    return false;
};

// find if the user already gave feedback
const isHaveFeedBack = (email) => {
    for (let i in json.users) {
        if (email === json.users[i].email) {
            if (json.users[i].hasOwnProperty('rate')) {
                console.log("is have feedback:"+json.users[i]);
                return json.users[i];
            }
            else
                return false;
        }
    }
};


// Write  feedback to json

const writeFeedBack = (feedback) => {
    for (let i in json.users) {
        if (feedback.email === json.users[i].email) {
            json.users[i].free_text = feedback.free_text;
            json.users[i].rate = feedback.rate;
            json.users[i].answers = feedback.answers;
            fs.writeFileSync('./saveFeedBack/feedback.json', JSON.stringify(json, null, 2));
            return 'success';

        }
    }
    return 'failed';
};


module.exports.isExists = isExists;
module.exports.isHaveFeedBack = isHaveFeedBack;
module.exports.writeFeedBack = writeFeedBack;




