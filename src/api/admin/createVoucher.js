module.exports = {
    path: {
        internal: 'createVoucher',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function (params) {
        const cdn = this.cdn;
        const { voucher } = this.sequelizeModels;
        const instance = await voucher.create({
            title: params.title,
            description: params.description,
            count: params.count,
            shopId: params.shop,
            expiredAt: params.expiredAt
        }, { raw: true });

        if (params.image) {
            await cdn.upload(params.image, `voucher-${instance.id}`);
        }

        Object.assign(instance, { image: cdn.parse(`voucher-${instance.id}`) })
        return instance;
    },
};