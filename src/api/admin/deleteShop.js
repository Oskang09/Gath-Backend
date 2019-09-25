module.exports = {
    path: {
        api: '/shops/:id',
        internal: 'deleteShop',
    },
    method: 'DELETE',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { shop } = this.sequelizeModels;
        const instance = await shop.findByPk(params.id, { raw: true });
        if (instance) {
            await instance.destroy();
            return ctx.redirect('/web/list_shop?_apis=findShop');
        }
        return null;
    },
};