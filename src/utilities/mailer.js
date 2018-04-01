const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const config = require('../config.js');

let mailConfig;
let mailer;

if (process.env.NODE_ENV === 'prod' ){
    // all emails are delivered to destination
    let options = {
      auth: {
          api_key: config.SENDGRID_API_KEY
      }
    }

    mailer = nodemailer.createTransport(sgTransport(options));
} else {
    // all emails are catched by ethereal.email
    mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: config.ETHEREAL_CREDENTIALS.user,
            pass: config.ETHEREAL_CREDENTIALS.password
        },
        logger: true,
        debug: true
    };
    mailer = nodemailer.createTransport(mailConfig);
}

exports.mailer = mailer;
