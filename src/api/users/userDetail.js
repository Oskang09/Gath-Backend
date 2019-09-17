module.exports = {
    path: {
        api: '/users/:id',
        internal: 'userDetail',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { user, user_voucher, voucher, notification, event } = this.sequelizeModels;
        if (params.id === 'profile') {
            return user.findByPk(ctx.state.user.id, { raw: true });
        } else if (params.id === 'notification') {
            const limit = Number(params.limit) || 1;
            const page = Number(params.page) || 1;
            const offset = ( page - 1 ) * limit;
            const { rows, count } = await notification.findAndCountAll({
                limit, offset,
                include: [ event ],
                order: [
                    [ 'createdAt', 'DESC' ]
                ],
                where: {
                    userId: ctx.state.user.id
                },
            });
    
            return {
                pagination: { page, count, limit },
                result: rows,
            };
        } else if (params.id === 'voucher') {
            const limit = Number(params.limit) || 1;
            const page = Number(params.page) || 1;
            const offset = ( page - 1 ) * limit;
    
            const { rows, count } = await user_voucher.findAndCountAll({
                limit, offset,
                include: [ voucher, user ],
                where: {
                    userId: ctx.state.user.id
                },
            });
    
            return {
                pagination: { page, count, limit },
                result: rows,
            };
        } else {
            return user.findByPk(params.id, { raw: true });
        }
    },
};