require("dotenv").config();


exports.loadLoginFile=(req, res) => {
    console.log("hello world");
    res.sendFile(path.join(__dirname, '../loginAndForm/log_in_form.html'));

};
exports.loadFormFile= (req, res) => {
    
    res.sendFile(path.join(__dirname, '../loginAndForm/form.html'));
};
exports.loadMessageFile= (req, res) => {
    
    res.sendFile(path.join(__dirname, '../loginAndForm/message.html'));
};