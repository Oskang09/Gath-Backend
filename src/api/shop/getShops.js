module.exports = {
    path: {
        api: '/shops',
        internal: 'getShops',
    },
    method: 'GET',
    // before: [ 'verifyToken' ],
    handler: async function() {
        const { shop } = this.sequelizeModels;
        const instance = await shop.findAll({ raw: true });
        return instance;
    },
};