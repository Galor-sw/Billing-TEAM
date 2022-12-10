require("dotenv").config({path: 'config/.env'});
const serverlogger = require(`./logger.js`);
const express = require('express');
const cors = require('cors');

//data base
const db = require('./mongoDB/dbConnection');
const feedBackController = require('./mongoDB/controllers/feedbackController');


const app = express();
let logger = serverlogger.log;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(cors());
const feedbackRouter = require('./routers/feedbackRouter');
const fileLoaderRouter = require('./routers/fileLoaderRouter');
const chatRouter = require('./routers/chatRouter');
const counterRouter = require('./routers/counterRouter');

//feedback
app.use('/users', feedbackRouter);

//feedbacks counter
app.use('/counter', counterRouter);

//chat support
app.use('/contactSupport', chatRouter);

//load files
app.use('/', fileLoaderRouter);
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/favicon.ico', express.static('./favicon.ico'));

//create server
app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server is listening on port ${process.env.PORT} status ${process.env.STATUS}`)
});

