const chatServer = require('../LiveChat/server');
// const url = require("url");
let chatServerFlag = false;

exports.startChat= (req,res) => {
    console.log("hgh");
    if (chatServerFlag == false) {
        chatServer.turnOnServerChat();
        chatServerFlag = true;
    }
    let mail = req.params.mail;
    let name = mail.split('@')[0];
    console.log(name);
    res.send("http://localhost:3000?username=" + name);
};