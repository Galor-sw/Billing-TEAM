const GoogleSheet = require('./googleSheets/googleSheets');
const chatServer = require('./LiveChat/server');
const Server = require('./server.js');
const logger = require(`./logger`);
//start general server
Server.createServer();
Server.start();

//chatServer.turnOnServerChat();

