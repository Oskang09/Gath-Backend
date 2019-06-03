const { disallow } = require('@utils');

module.exports = (app) => {

    const { mailer } = app.get('services');
    app.use('mailing', {
        /**
         * For more information - https://nodemailer.com/message/attachments/
         * @param {String} [from] From email address
         * @param {String} [to] To email address ( use ',' to apply multi send )
         * @param {String} [subject] Title want to send to target
         * @param {String} [text] Sending email using raw text
         * @param {String} [html] Sending email using HTML formatted
         */
        async create({ from, to, subject, text, html }) {
            const res = await mailer.sendEmail({
                from, to, subject, text, html
            });

            return {
                accepted: res.accepted,
                rejected: res.rejected
            };
        }
    });

    app.service('mailing').hooks({
        before: disallow('socketio', 'rest', 'primus')
    });
};