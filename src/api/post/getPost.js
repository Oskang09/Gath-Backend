module.exports = {
    path: {
        api: '/posts',
        internal: 'getPost',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;

        const { post, shop } = this.sequelizeModels;
        const { count, rows } = await post.findAndCountAll({
            include: [ shop ],
            limit, offset
        });
        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};