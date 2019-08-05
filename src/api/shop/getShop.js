module.exports = {
    path: {
        api: '/shops/:shopId',
        internal: 'getShop',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const { shop } = this.sequelizeModels;
        const instance = await shop.findByPk(params.shopId, { raw: true });
        return instance;
    },
};