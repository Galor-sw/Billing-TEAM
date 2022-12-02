const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const logger = require(`../logger.js`);
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const serLogger = logger.log;

const admin = 'Chat Admin';

// Set static folder
app.use(express.static(path.join(__dirname, 'Frontend')))

// Runs when client connect to our sever
io.on('connection', socket => {
    serLogger.info("New connection to support live chat established");
    socket.on("joinChat", ({username}) => {

        socket.emit('message', formatMessage(admin, `Hey ${username}, welcome to support chat`));

        socket.on('typing', (data) => {
            socket.broadcast.emit('display', data)
        })

        socket.on('chatMessage', msg => {
            io.emit('message', formatMessage(username, msg));
        });

        socket.on('close', msg => {
            socket.broadcast.emit('message', formatMessage(admin, `${msg.user} ${msg.text}`));
        });
    });
});


const turnOnServerChat = () => {
    //init listener
    server.listen(PORT, () => serLogger.info(`Live chat server running on ${PORT}`));
}

module.exports = {turnOnServerChat};
