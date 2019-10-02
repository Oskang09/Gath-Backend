module.exports = {
    path: {
        api: '/users/notification/:id',
        internal: 'userNotification',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { notification, event } = this.sequelizeModels;
        const userId = params.id === 'me' ? ctx.state.user.id : params.id;
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;
        const { rows, count } = await notification.findAndCountAll({
            limit, offset,
            include: [ { model: event, paranoid: false } ],
            order: [
                [ 'id', 'DESC' ]
            ],
            where: { userId },
        });

        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};