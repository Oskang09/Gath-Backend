module.exports = {
    path: {
        api: '/vouchers/:id',
        internal: 'getVoucher',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const { voucher } = this.sequelizeModels;
        const result = await voucher.findByPk(params.id);
        return result;
    },
};