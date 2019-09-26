const Op = require('sequelize').Op;

module.exports = {
    path: {
        api: '/shops',
        internal: 'findShop',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;
        const where = {};

        if (params.name && params.name.length > 0) {
            where.name = {
                [Op.iRegexp]: params.name.split(' ').join('|')
            };
        }
        if (params.type) {
            where.type = params.type.includes(',') ? 
                params.type.split(',') :
                params.type;;
        }

        const { shop } = this.sequelizeModels;
        const { rows, count } = await shop.findAndCountAll({    
            raw: true, limit, offset, where
        });
        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};