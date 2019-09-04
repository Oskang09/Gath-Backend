module.exports = {
    path: {
        api: '/users/voucher',
        internal: 'receiveVoucher',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { user_voucher, voucher } = this.sequelizeModels;
        const { expiredAt, count } = await voucher.findByPk(params.voucher, {
            raw: true,
            select: [ 'expiredAt', 'count' ]
        });

        if (count <= 0) {
            throw 'EMPTY_VOUCHER';
        }

        if (Date.now() > expiredAt) {
            throw 'EXPIRED_VOUCHER';
        }

        const result = await user_voucher.findOne({
            where: {
                userId: ctx.state.user.id,
                voucherId: params.voucher
            }
        });

        if (result) {
            throw 'RECEIVED_VOUCHER';
        }
        
        const response = await user_voucher.create({
            userId: ctx.state.user.id,
            voucherId: params.voucher,
            receivedAt: Date.now()
        });
        return response;
    },
};