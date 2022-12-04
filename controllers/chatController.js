const CHAT_URL = process.env.PROD_CHAT_URL;

exports.startChat = (req, res) => {
    let name = req.params.mail.split('@')[0];
    res.send(`${CHAT_URL}?username=${name}`);
};