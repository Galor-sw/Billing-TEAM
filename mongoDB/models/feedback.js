const {Schema, model} = require('mongoose');

const answersSchema = new Schema({
    recommend: String,
    choose_again: String,
    improvement: String,
    customer_support: String,
});

const metaDataSchema = new Schema({
    age: String,
    gender: String,
    occupation: String,
});

const feedbackSchema = new Schema({
    email: {type: String, required: true},
    free_text: String,
    rate: String,
    answers: [answersSchema],
    metaData: [metaDataSchema]
}, {collection: 'feedbacks'});

const Feedback = model('Feedback', feedbackSchema);

module.exports = Feedback;