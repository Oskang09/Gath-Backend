const { disallow } = require('@utils');

module.exports = (app) => {
    const { firebase } = app.get('services');

    app.use('firebaseUser', {
        async get(uid) {
            return firebase.auth.getUser(uid);
        }
    });

    app.service('firebaseUser').hooks({
        before: disallow('socketio', 'rest', 'primus')
    });
};