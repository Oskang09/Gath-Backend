module.exports = {
    path: {
        api: '/users/voucher/:id',
        internal: 'userVoucher',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { user_voucher, user, voucher } = this.sequelizeModels;
        const userId = params.id === 'me' ? ctx.state.user.id : params.id;
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;

        const { rows, count } = await user_voucher.findAndCountAll({
            limit, offset,
            include: [ voucher, user ],
            where: { userId },
        });

        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};