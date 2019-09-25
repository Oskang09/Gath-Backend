module.exports = {
    path: {
        api: '/vouchers/:id',
        internal: 'getVoucher',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const { voucher, shop } = this.sequelizeModels;
        const result = await voucher.findByPk(params.id, { raw: true });
        if (result.shopId) {
            Object.assign(result, { shop: await shop.findByPk(result.shopId) });
        }
        return result;
    },
};