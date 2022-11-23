//const GoogleSheet = require('./googleSheets/googleSheets');
//const chatServer = require('./LiveChat/server');
const Server = require('./server.js');
//start general server
Server.createServer();
Server.start();

//chatServer.turnOnServerChat();

//GoogleSheet.getRow();

/*
let rows = [{
    email: 'test1@gmail.com',
    free_text: 'test1',
    rate: '9',
    recommended: 'no',
    choose_again : 'no',
    improvement: 'pace',
    customer_support: 'no'
},{
    email: 'test1@gmail.com',
    free_text: 'test1',
    rate: '8',
    recommended: 'yes',
    choose_again : 'yes',
    improvement: 'clear',
    customer_support: 'yes'
}];
*/

//GoogleSheet.addRow(rows);
