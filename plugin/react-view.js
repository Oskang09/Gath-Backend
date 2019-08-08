module.exports = function(router, globalScope) {
    router.get('/web/*', async function (ctx) {
        try {
            await ctx.render(ctx.params['0'], { api: globalScope.api });
        } catch (error) {
            await ctx.render('404');
        }
    });
};