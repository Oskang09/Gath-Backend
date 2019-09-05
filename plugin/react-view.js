const fs = require('fs');

module.exports = function(router, globalScope) {

    const render = async (props, ctx) => {
        Object.assign(props, { admin: ctx.state.user });
        try {
            await ctx.render('layout', props);
        } catch (error) {
            await ctx.render('error', { error: error.message });
        }
    };

    router.get('/web/*', async function (ctx) {
        const view = ctx.params['0'] || 'index';
        const data = {};

        const apis = ctx.query._apis;
        if (apis) {
            const apiList = apis.includes(',') ? apis.split(',') : [ apis ];
            for (const apiName of apiList) {
                data[apiName] = await globalScope.api[apiName](ctx.query);
            }
        }

        const accessToken = ctx.cookies.get('gath-admin');
        if (accessToken) {
            if (view === 'logout') {
                ctx.cookies.set('gath-admin', null, { overwrite: true });
                return ctx.redirect('/web/login');
            }
            ctx.state.user = await globalScope.api.getAdmin({ token: accessToken });
        }

        if (view === 'login' && ctx.state.user) {
            return ctx.redirect('/web/');
        }

        if (view !== 'login' && !ctx.state.user) {
            return ctx.redirect('/web/login');
        }

        return render({ view, data }, ctx);
    });

    router.post('/web/*', async function (ctx) {
        const view = ctx.params['0'];

        const accessToken = ctx.cookies.get('gath-admin');
        if (accessToken) {
            ctx.state.user = await globalScope.api.getAdmin({ token: accessToken });
        }

        if (view === 'login' && ctx.state.user) {
            return ctx.redirect('/web/create_shop');
        }
        
        if (view !== 'login' && !ctx.state.user) {
            return ctx.redirect('/web/login');
        }

        const api = ctx.query.action;
        const params = {};
        Object.assign(params, ctx.request.body);
        for (const key of Object.keys(ctx.request.files)) {
            const file = ctx.request.files[key];
            params[key] = fs.readFileSync(file.path).toString('base64');
        }

        try {
            const response = await globalScope.api[api](params, ctx, true);
            if (!ctx.body) {
                return render({ view, response }, ctx);
            }
        } catch (error) {
            return render({ view, error }, ctx);
        }
    });
};