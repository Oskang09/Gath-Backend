const UUID = require('uuid/v4');
const fs = require('fs');

module.exports = function(router, globalScope) {

    const csrfToken = [];
    const render = async (props, ctx) => {
        const csrf = UUID();
        csrfToken.push(csrf);
        Object.assign(props, { csrf });
    
        try {
            await ctx.render('layout', props);
        } catch (error) {
            await ctx.render('error', { error: error.message });
        }
    };

    router.get('/web/*', async function (ctx) {
        const view = ctx.params['0'] || 'index';
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

        return render({ 
            view, 
            api: globalScope.api,
            admin: ctx.state.user,
        }, ctx);
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

        const token = ctx.request.body._csrf;
        const index = csrfToken.indexOf(token);
        if (index !== -1) {
            csrfToken.splice(index, 1);
        } else {
            return ctx.render('error', { error: 'Invalid csrf token. Try reload page.' });
        }

        const api = ctx.query.action;
        const params = {};
        Object.assign(params, ctx.request.body);
        for (const key of Object.keys(ctx.request.files)) {
            const file = ctx.request.files[key];
            params[key] = fs.readFileSync(file.path).toString('base64');
        }

        const response = await globalScope.api[api](params, ctx, true);
        if (!ctx.body) {
            return render({ 
                view, response, 
                api: globalScope.api,
                admin: ctx.state.user,
            }, ctx);
        }
    });
};