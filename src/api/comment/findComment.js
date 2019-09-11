module.exports = {
    path: {
        api: '/events/:id/comments',
        internal: 'findComments',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const limit = Number(params.limit) || 50;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;
        const where = { eventId: params.id };
        const { comment, user } = this.sequelizeModels;
        const { rows, count } = await comment.findAndCountAll({
            limit,
            offset,
            where,
            order: [
                [ 'createdAt', 'DESC' ]
            ],
            include: [ user ],
        });
        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};