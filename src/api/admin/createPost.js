module.exports = {
    path: {
        internal: 'createPost',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function (params) {
        const cdn = this.cdn;
        const { post } = this.sequelizeModels;
        const instance = await post.create({
            title: params.title,
            content: params.content,
            type: params.type,
            shopId: params.shop,
            voucherId: params.voucher
        }, { raw: true });

        if (params.image) {
            await cdn.upload(params.image, `post-${instance.id}`);
        }

        Object.assign(instance, { image: cdn.parse(`post-${instance.id}`) })
        return instance;
    },
};