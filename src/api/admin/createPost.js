module.exports = {
    path: {
        internal: 'createPost',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function (params) {
        const cdn = this.cdn;
        const { post } = this.sequelizeModels;
        const voucher = Number(params.voucher);
        const shop = Number(params.shop);
        const body = {
            title: params.title,
            content: params.content,
            type: params.type,
            shopId: shop === 0 ? null : shop,
            voucherId: voucher === 0 ? null : voucher
        };
        if (params.image) {
            Object.assign(body, { image: await cdn.upload(params.image) });
        }
        return post.create(body, { raw: true });
    },
};