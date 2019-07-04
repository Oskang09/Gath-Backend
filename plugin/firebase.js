const FirebaseAdmin      = require('firebase-admin');
const UUID               = require('uuid/v4');

module.exports = function (fastify, options, next) {
    FirebaseAdmin.initializeApp({ credential: FirebaseAdmin.credential.cert(options) });

    const bucket = FirebaseAdmin.storage().bucket('gs://gathfyp2019.appspot.com');
    fastify.decorate('auth', FirebaseAdmin.auth());
    fastify.decorate('bucket', bucket);
    fastify.decorate('cdn', {
        parse(id) {
            return `https://firebasestorage.googleapis.com/v0/b/gathfyp2019.appspot.com/o/${id}?alt=media`;
        },
        async upload(b64) {
            const file = bucket.file(UUID().toString());
            const base64 = b64.includes(',') ?
                Buffer.from(b64.split(',')[1], 'base64') :
                Buffer.from(b64, 'base64');
            const ws = file.createWriteStream({
                validation: 'crc32c',
                metadata: {
                    contentType: "image/png",
                },
            });
    
            return new Promise(
                (resolve, reject) => {
                    ws.on('error', (error) => {
                        reject(error);
                    });
    
                    ws.on('finish', () => {
                        resolve(file.id);
                    });
    
                    ws.end(base64);
                }
            );
        },
        async remove(id) {
            const file = bucket.file(id);
            if ( (await file.exists())[0] ) {
                await file.delete();
            }
            return;
        }
    });
    return next();
};