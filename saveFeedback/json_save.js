const fs = require("fs");
const {stringify} = require("nodemon/lib/utils");
const json = require("./feedback.json");
// find if email exists
const isExists= (email) => {
    for ( let i in json.users) {
        if (email == json.users[i].email) {
            console.log(email);
            return true;
        }
    }
    return false;
};

// find if the user already gave feedback
const isHaveFeedBack = (email) => {
    for (let i in json.users) {
        if (email == json.users[i].email) {
            if (json.users[i].hasOwnProperty('rate'))
                return json.users[i];
            else
                return '';
        }
    }
};


// insert new feedback
const email="galor@gmail.com"; //need to get from forms
const rate = 5;
const freeText="I Love them";
const answers =
{
    recommend: "yes",
    choose_again: "yes",
    improvement: "Speed,Safety",
    customer_support: "no"
}

//
// for  ( let i in json.users)
//     {
//         // find the user
//         if (email == json.users[i].email)
//         {
//             //insert user's feedback to object
//             json.users[i].freeText=freeText;
//             json.users[i].rate=rate;
//             json.users[i].answers=answers;
//         }
//     }
//
// fs.writeFileSync('./bec.json', JSON.stringify(json, null, 2));



module.exports.isExists=isExists;
module.exports.isHaveFeedBack=isHaveFeedBack;



