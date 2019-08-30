module.exports = {
    path: {
        api: '/shops',
        internal: 'getShops',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;
        
        const { shop } = this.sequelizeModels;
        const { rows, count } = await shop.findAndCountAll({    
            raw: true, limit, offset
        });
        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};