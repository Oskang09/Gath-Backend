const Glob      = require('glob');

module.exports = function (fastify, options, next) {
    for (const api of Glob.sync('../src/api/**/*.js', { cwd: __dirname })) {
        const module = require(api);
        if (Array.isArray(module.preValidation)) {
            const middleware = [];
            module.preValidation.forEach(
                (mw) => {
                    if (typeof mw === 'string') {
                        middleware.push( require(`../src/middleware/${mw}`)() );
                    } else if (typeof mw === 'object') {
                        middleware.push(
                            require(`../src/middleware/${mw.name}`)(mw.params)
                        );
                    }
                }
            );
            module.preValidation = middleware;
        }
        fastify.route(module);
    }
    return next();
};
