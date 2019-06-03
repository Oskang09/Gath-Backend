const UUID               = require('uuid/v4');
const { disallow } = require('@utils');

module.exports = (app) => {
    const { bucket } = app.get('services');

    app.use('cdn', {
        async create(stream) {
            if (!stream.base64) {
                throw Error(`cdn.invalid_data`);
            }
            const file = bucket.file(UUID().toString());
            const base64 = Buffer.from(stream.base64.split(',')[1], 'base64');
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

    app.service('cdn').hooks({
        before: disallow('socketio', 'rest', 'primus')
    });
};