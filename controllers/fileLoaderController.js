require("dotenv").config();
let pathValidator;
process.env.STATUS === 'production'
    ? (pathValidator = process.env.PROD_URL)
    : (pathValidator = process.env.DEV_URL);


exports.loadLoginFile=(req, res) => {
    res.sendFile("https://billing-team-repo.onrender.com/loginAndForm/log_in_form.html");

};
exports.loadFormFile= (req, res) => {
    res.sendFile("https://billing-team-repo.onrender.com/loginAndForm/form.html");
};
exports.loadMessageFile= (req, res) => {
    res.sendFile("https://billing-team-repo.onrender.com/loginAndForm/message.html");
};