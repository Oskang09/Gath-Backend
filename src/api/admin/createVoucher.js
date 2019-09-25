module.exports = {
    path: {
        internal: 'createVoucher',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function (params) {
        const cdn = this.cdn;
        const { voucher } = this.sequelizeModels;
        const body = {
            title: params.title,
            description: params.description,
            count: params.count,
            shopId: params.shop,
            expiredAt: params.expiredAt
        };
        if (params.image) {
            Object.assign(body, { image: await cdn.upload(params.image) })
        }
        return voucher.create(body, { raw: true });
    },
};