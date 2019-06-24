const Glob      = require('glob');

module.exports = function (fastify, options, next) {
    for (const api of Glob.sync('../src/apis/**/*.js', { cwd: __dirname })) {
        const module = require(api);
        fastify.route(module);
    }
    return next();
};
