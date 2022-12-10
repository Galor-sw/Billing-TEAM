const mongoose = require('mongoose');
const consts = require('./constants');

const serverLogger = require('../logger');
const logger = serverLogger.log;

const {DB_HOST, DB_USER, DB_PASS} = consts;
const url = DB_HOST;

const options = {
    useNewUrlParser: true,    // For deprecation warnings
    useUnifiedTopology: true, // For deprecation warnings
    user: DB_USER,
    pass: DB_PASS
};

// change to Logger!
exports.connectToDB = () => {
    mongoose
        .connect(url, options)
        .then(() => {
            logger.info('connected to Billing-DB')
        })
        .catch(err => logger.error(`connection error: ${err}`));
}