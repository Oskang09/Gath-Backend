module.exports = {
    path: {
        api: '/events',
        internal: 'getEvents',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;

        const { event } = this.sequelizeModels;
        const { count, rows } = await event.findAndCountAll({ limit, offset, raw: true });
        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};