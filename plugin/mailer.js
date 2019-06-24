const Mailer       = require('nodemailer');

module.exports = function (fastify, options, next) {
    const mailer = Mailer.createTransport(options);
    fastify.decorate('mailer', mailer);
    return next();
};