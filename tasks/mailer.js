const mailer      = require('nodemailer');
const config      = require('@config/mailer');
const instance = mailer.createTransport({
    service: 'gmail',
    auth: config
});

module.exports = instance;