const template = require('./mailTemplate.json');
const serverLogger = require(`../logger.js`);
const logger = serverLogger.log;
const axios = require('axios').default;

exports.confirmationSend = (feedback) => {
    writeMail(feedback);
    axios.post('https://mail-service-69zm.onrender.com/api/mail/sendMail', template)
        .then(test => {
            logger.info('a mail was sent to the client');
        })
        .catch(err => {
            logger.error(`failed to send a mail conformation. ${err}`);
        })
}

const writeMail = (feedback) => {

    template.mail.to[0] = feedback.email;

    template.mail.html =
        `Hey ${feedback.email.split('@')[0]},<br><br>
    Thank you for your feedback,<br>
    here are your feedback details:<br>
    your age is: ${feedback.metaData.age}<br>
    your gender is: ${feedback.metaData.gender}<br>
    your occupation is: ${feedback.metaData.occupation}<br><br>
    you rate us: ${feedback.rate}/4<br>
    free text: ${feedback.free_text}<br>
    will you recommend our service? ${feedback.answers.recommend}<br>
    will you choose our service again? ${feedback.answers.choose_again}<br>
    we should improve in: ${feedback.answers.improvement}<br>
    you used costumer support? ${feedback.answers.customer_support}<br><br>

    Best regards,<br>
    Billing Team.`;

}
