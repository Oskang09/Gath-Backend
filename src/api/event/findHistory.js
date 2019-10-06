module.exports = {
    path: {
        api: '/history',
        internal: 'findHistory',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;
        const where = {
            status: 'END'
        };

        if (params.type) {
            where.type = params.type.includes(',') ? 
                params.type.split(',') :
                params.type;;
        }

        const { event } = this.sequelizeModels;
        const { count, rows } = await event.findAndCountAll({
            limit,
            offset,
            where,
            order: [
                [ 'updatedAt', 'DESC' ]
            ],
            raw: true
        });
        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};