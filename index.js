require("dotenv").config({path: 'config/.env'});
const express = require('express');
const serverLogger = require(`./logger.js`);
const logger = serverLogger.log;
const cors = require('cors');

//data base
const db = require('./mongoDB/dbConnection');

//feedbacks requests handler
const feedbackRouter = require('./routers/feedbackRouter');
//html files handler
const fileLoaderRouter = require('./routers/fileLoaderRouter');
//chat supports request handler
const chatRouter = require('./routers/chatRouter');
//counter request handler
const counterRouter = require('./routers/counterRouter');

db.connectToDB();


const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(cors());


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

