const {Schema, model} = require('mongoose');

const counterSchema = new Schema({
    counter: {type: Number, required: true},
}, {collection: 'feedbacks'});

const Counter = model('Counter', counterSchema);

module.exports = Counter;