require("dotenv").config();
const path = require("path");

module.exports = {

    loadLoginFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../loginAndForm/log_in_form.html'));
    },
    loadFormFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../loginAndForm/form.html'));
    },
    loadMessageFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../loginAndForm/message.html'));
    }
}
