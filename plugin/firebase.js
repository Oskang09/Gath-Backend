const FirebaseAdmin      = require('firebase-admin');
// const UUID               = require('uuid/v4');

module.exports = function (fastify, options, next) {
    FirebaseAdmin.initializeApp({ credential: FirebaseAdmin.credential.cert(options) });
    
    fastify.decorate('auth', FirebaseAdmin.auth());
    fastify.decorate('bucket', FirebaseAdmin.storage().bucket('gs://gathfyp2019.appspot.com'));

    return next();
};