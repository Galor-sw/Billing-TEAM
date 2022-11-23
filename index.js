const GoogleSheet = require('./googleSheets/googleSheets');
const chatServer = require('./LiveChat/server');
const Server = require('./server.js');
//start general server
Server.createServer();
Server.start();

//chatServer.turnOnServerChat();

GoogleSheet.getRow();


let rows = {
    email: 'test1@gmail.com',
    free_text: 'test1',
    rate: '9',
    answers:
        {
            "recommend": "yes",
            "choose_again": "yes",
            "improvement": "Speed,Safety",
            "customer_support": "no"
        }
};



GoogleSheet.addRow(rows);
