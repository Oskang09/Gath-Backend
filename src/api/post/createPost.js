module.exports = {
    path: {
        internal: 'createPost',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function (params) {
        const cdn = this.cdn;
        const { shop } = this.sequelizeModels;
        const instance = await shop.create({ title: params.title }, { raw: true });

        if (params.image) {
            await cdn.upload(params.image, `post-${instance.id}`);
        }

        Object.assign(instance, { image: cdn.parse(`post-${instance.id}`) })
        return instance;
    },
};