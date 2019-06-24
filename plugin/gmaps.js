const maps         = require('@google/maps');

module.exports = function (fastify, options, next) {
    const client = maps.createClient(options);
    fastify.decorate('gmaps', client);
    return next();
};