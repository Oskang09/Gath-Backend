module.exports = {
    path: {
        api: '/users/voucher',
        internal: 'userVoucher',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;

        const { user_voucher, voucher } = this.sequelizeModels;
        const voucherRes = await user_voucher.findAll({
            select: [ 'voucherId' ],
            where: {
                userId: ctx.state.user.id
            },
            raw: true,
        });

        const { rows, count } = await voucher.findAndCountAll({
            where: {
                id: voucherRes.map((res) => res.voucherId)
            },
            limit, offset,
            raw: true
        });
        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};