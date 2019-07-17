const Glob        = require('glob');
const Joi         = require('joi');

module.exports = function (router, globalScope) {
    const middleware = {};
    for (const mw of Glob.sync('../src/middleware/**/*.js', { cwd: __dirname })) {
        const module = require(mw);
        middleware[module.name] = module.handler;
    }

    for (const api of Glob.sync('../src/api/**/*.js', { cwd: __dirname })) {
        const module = require(api);
        const accessFlow = [];
        const schema = Joi.object().keys(module.schema || {});

        module.handler = module.handler.bind(globalScope);
    
        if (module.path.api) {
            if (module.before) {
                for (const before of module.before) {
                    if (typeof before === 'string') {
                        accessFlow.push(middleware[before]({}));
                    } else if (typeof before === 'object') {
                        accessFlow.push(middleware[before.name](before.params));
                    } else if (typeof before === 'function') {
                        accessFlow.push(before);
                    }
                }
            }

            accessFlow.push(
                async function (ctx, next) {
                    const params = Object.assign({}, ctx.request.body, ctx.params.body, ctx.query);
                    if (module.schema) {
                        const result = schema.validate(params);
                        if (result.error) {
                            throw "JOI_VALIDATE_ERROR";
                        }
                    }
                    ctx.body = await module.handler(params, ctx);
                    return next();
                }
            );

            if (module.after) {
                for (const after of module.after) {
                    if (typeof after === 'string') {
                        accessFlow.push(middleware[after]({}));
                    } else if (typeof after === 'object') {
                        accessFlow.push(middleware[after.name](after.params));
                    } else if (typeof after === 'function') {
                        accessFlow.push(after);
                    }
                }
            }
            router[module.method.toLowerCase()](module.path.api, ...accessFlow);
        }
    
        if (module.path.internal) {
            globalScope.api[module.path.internal] = function (params) {
                if (module.schema) {
                    const result = schema.validate(params);
                    if (result.error) {
                        throw "JOI_VALIDATE_ERROR";
                    }
                }
                return module.handler(params, null);
            };
        }
    }
};