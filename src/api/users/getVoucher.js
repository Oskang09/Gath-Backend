module.exports = {
    path: {
        api: '/users/voucher',
        internal: 'userVoucher',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { user_voucher, voucher } = this.sequelizeModels;

        const voucherRes = await user_voucher.findAll({
            select: [ 'voucherId' ],
            where: {
                userId: ctx.state.user.id
            },
            raw: true,
        });

        const vouchers = await voucher.findAll({
            where: {
                id: voucherRes.map((res) => res.voucherId)
            }
        });
        return vouchers;
    },
};