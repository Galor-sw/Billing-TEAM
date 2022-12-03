const chatServer = require('../LiveChat/server');
// const url = require("url");
let chatServerFlag = true;

exports.startChat = (req, res) => {
    if (chatServerFlag == false) {
        chatServer.turnOnServerChat();
        chatServerFlag = true;
    }
    let name = req.params.mail.split('@')[0];
    console.log(name);
    res.send("http://localhost:3000?username=" + name);
};