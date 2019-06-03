const mailer      = require('nodemailer');
const instance = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gathfyp2019@gmail.com',
        pass: '@Gathfyp2019!'
    }
});

module.exports = instance;