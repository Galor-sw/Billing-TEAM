const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const logger = require(`../logger.js`);

let serLogger = logger.log;
const PORT = process.env.PORT || 3000;
const admin = 'Chat Admin';

// Create server
const server = http.createServer((req,res) => {
   let pathname = url.parse(req.url).pathname;
   let ext = path.extname(pathname);
   if (ext){
      if (ext === '.css'){
         res.writeHead(200, {'Content-Type': 'text/css'});
      }
      else if(ext === '.js'){
         res.writeHead(200, {'Content-Type': 'text/javascript'});
      }
      let file = fs.createReadStream(__dirname + pathname);
      file.pipe(res);
   }
   else{
      serLogger.info("New connection to support live chat established");
      res.writeHead(200, {'Content-Type': 'text/html'});
      let file = fs.createReadStream('./LiveChat/Frontend/index.html')
      file.pipe(res);
   }
});

// create socket.io to server
const io = socketio(server);

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
         socket.broadcast.emit('message', formatMessage(admin, `${msg.user} ${msg.text}`));
      });
   });
});

const turnOnServerChat = () => {
   //init listener
   server.listen(PORT, () => serLogger.info(`Live chat server running on ${PORT}`));
}

module.exports = {turnOnServerChat};

