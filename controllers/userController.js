const json = require("../saveFeedback/json_save");
exports.emailCheck= (req,res) => {
    if (!json.isExists(req.body.mail)) {
        res.send("The email does not exist, try again");
    } else {
        res.send("The email exists");
    }
};
// module.exports = {emailCheck};
