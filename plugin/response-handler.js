const moment = require('moment');

module.exports = function (setting, globalScope) {
    return async (ctx, next) => {
        const start = moment();
        try {
            await next();
            if (!ctx.body) {
                return ctx.render('404');
            }
        } catch (error) {
            const errorSetting = setting[error];
            if (errorSetting) {
                let errorMessage;
                if (typeof errorSetting === 'string' || typeof errorSetting === 'object') {
                    errorMessage = errorSetting;
                } else if (typeof errorSetting === 'function') {
                    errorMessage = errorSetting(error);
                }
                ctx.body = {
                    success: false,
                    ...errorMessage
                };
            } else {
                ctx.body = {
                    success: false,
                    message: error
                }
            }
        }

        const timing = moment() - start;
        ctx.set('X-Response-Time', `${timing}ms`);
    };
};