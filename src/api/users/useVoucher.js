module.exports = {
    path: {
        api: '/users/voucher',
        internal: 'useVoucher',
    },
    method: 'DELETE',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { user_voucher, voucher } = this.sequelizeModels;
        const { expiredAt } = await voucher.findByPk(params.voucher, {
            raw: true,
            select: [ 'expiredAt' ]
        });

        if (Date.now() > expiredAt) {
            throw 'EXPIRED_VOUCHER';
        }
        
        const result = await user_voucher.findOne({
            where: {
                userId: ctx.state.user.id,
                voucherId: params.voucher
            }
        });

        if (!result) {
            throw 'MISSING_VOUCHER';
        }
        await result.update({ usedAt: Date.now() });
        return result;
    },
};