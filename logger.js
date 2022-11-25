const moment = require('moment');
const fs = require('fs');
const { EventEmitter } = require('events');
const path = require('path');
const winston = require('winston');
const {transports, createLogger, format} = require('winston');

const log = winston.createLogger({
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'logs.txt', level: 'error'}),
        new transports.File({filename: 'logs.txt', level:'info'})
    ]
});
module.exports.log = log;

