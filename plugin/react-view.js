module.exports = function(router, globalScope) {
    router.get('/web/*', async function (ctx) {
        try {
            await ctx.render(ctx.params['0']);
        } catch (error) {
            await ctx.render('404');
        }
    });
};