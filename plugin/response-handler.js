const moment = require('moment');

module.exports = function (setting, globalScope) {
    return async (ctx, next) => {
        const start = moment();
        try {
            await next();
            if (ctx.status === 404 && !ctx.body) return ctx.redirect('/web/');
        } catch (error) {
            if (error instanceof Error) {
                ctx.body = {
                    ok: false,
                    message: error.message,
                };
            } else {
                const errorSetting = setting[error];
                if (errorSetting) {
                    let errorMessage;
                    if (typeof errorSetting === 'string' || typeof errorSetting === 'object') {
                        errorMessage = errorSetting;
                    } else if (typeof errorSetting === 'function') {
                        errorMessage = errorSetting(error);
                    }
                    ctx.body = {
                        ok: false,
                        message: errorMessage
                    };
                } else {
                    ctx.body = {
                        ok: false,
                        message: error,
                    };
                }
            }
        }

        const timing = moment() - start;
        ctx.set('X-Response-Time', `${timing}ms`);
    };
};