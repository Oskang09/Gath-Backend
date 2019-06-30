const Glob      = require('glob');

module.exports = function (fastify, options, next) {
    const helpers = {};
    for (const api of Glob.sync('../src/helpers/**/*.js', { cwd: __dirname })) {
        const module = require(api);
        helpers[module.name] = module.item.bind(fastify);
    }
    fastify.decorate('helpers', helpers);
    return next();
};
