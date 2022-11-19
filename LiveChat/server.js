const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);
const admin = 'Chat Admin';

// Set static folder
app.use(express.static(path.join(__dirname, 'Frontend')))

// Runs when client connects to our sever
io.on('connection', socket => {
   socket.on("joinChat", ({username}) => {

      socket.emit('message', formatMessage(admin, `Hey ${username}, welcome to support chat`));

      socket.on('typing', (data) => {
         socket.broadcast.emit('display', data)
      })

      socket.on('chatMessage', msg => {
         io.emit('message', formatMessage(username, msg));
      });

      socket.on('close', msg => {
         console.log(msg);
         socket.broadcast.emit('message', formatMessage(admin, `${msg.user} ${msg.text}`));
      });

      // socket.on('disconnect', msg => {
      //    console.log(msg);
      //    socket.broadcast.emit('message', formatMessage(admin, `${msg.user} ${msg.text}`));
      // });

   });
});


// Init listener
const turnOnServerChat = () => {
   server.listen(PORT, () => console.log(`server running on ${PORT}`));
}

module.exports = {turnOnServerChat};
