module.exports = {
    path: {
        api: '/users/voucher',
        internal: 'receiveVoucher',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { user_voucher, voucher } = this.sequelizeModels;
        const targetVoucher = await voucher.findByPk(params.voucher);

        if (targetVoucher.count <= 0) {
            throw 'EMPTY_VOUCHER';
        }

        if (Date.now() > new Date(targetVoucher.expiredAt)) {
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

        return this.tsql(
            async (transaction) => {
                await targetVoucher.decrement('count', { by: 1, transaction });
                const response = await user_voucher.create({
                    userId: ctx.state.user.id,
                    voucherId: params.voucher,
                    receivedAt: Date.now()
                }, { transaction });
                return response;
            }
        );
    },
};