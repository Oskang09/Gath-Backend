const { disallow } = require('@utils');

module.exports = (app) => {

    app.use('notification', {

        async create(body) {
            return body;
        }

    });

    app.service('notification')
        .publish(() => app.channel('authenticated'))
        .hooks({
            before: disallow('socketio', 'rest', 'primus')
        });
};