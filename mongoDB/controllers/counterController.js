const Counter = require('../models/counter');
const serverLogger = require(`../../logger.js`);
const logger = serverLogger.log;

exports.updateCounter = (req, res) => {
    Counter.findOneAndUpdate({'counter': {$gte: 0}}, {$inc: {counter: 1}})
        .then(docs => {
            logger.info('Total feedbacks sent was incremented.')
        })
        .catch(err => {
            logger.error(err);
        })
}

exports.getCounter = (req, res) => {
    Counter.findOne({'counter': {$gte: 0}})
        .then(value => {
            res.send(JSON.stringify(value.counter));
        })
        .catch(err => {
            logger.error(err);
        })
};