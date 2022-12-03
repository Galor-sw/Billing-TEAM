require("dotenv").config({path: 'config/.env'});
const logger = require(`./logger.js`);
const chatServer = require('./LiveChat/server');
const express = require('express');
const cors = require('cors');
const app = express();
let serLogger = logger.log;
let chatServerFlag = false;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors());
const feedbackRouter = require('./routers/feedbackRouter');
const fileLoaderRouter = require('./routers/fileLoaderRouter');
const userRouter = require('./routers/userRouter');
const chatRouter = require('./routers/chatRouter');

//user
app.use('/emailCheck', userRouter);

//feedback
app.use('/users', feedbackRouter);

//chat support
app.use('/contactSupport', chatRouter);

//load files
app.use('/', fileLoaderRouter);
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/favicon.ico', express.static('./favicon.ico'));

//create server

// const start = () => {
app.listen(process.env.PORT || 3000, () => {
    serLogger.info(`Example app listening on port ${process.env.PORT} status ${process.env.STATUS}`)
});
// }