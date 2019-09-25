module.exports = {
    path: {
        internal: 'createPost',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function (params) {
        const cdn = this.cdn;
        const { post } = this.sequelizeModels;
        const body = {
            title: params.title,
            content: params.content,
            type: params.type,
            shopId: params.shop,
            voucherId: params.voucher
        };
        if (params.image) {
            Object.assign(body, { image: await cdn.upload(params.image) });
        }
        return post.create(body, { raw: true });
    },
};