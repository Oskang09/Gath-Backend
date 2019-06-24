const Glob      = require('glob');

module.exports = function (fastify, options, next) {
    for (const api of Glob.sync('../src/helpers/**/*.js', { cwd: __dirname })) {
        const module = require(api);
        fastify.decorate(module.name, module.item.bind(fastify));
    }
    return next();
};
