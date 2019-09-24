module.exports = {
    path: {
        internal: 'createShop',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function (params) {
        const cdn = this.cdn;
        const { shop } = this.sequelizeModels;

        const instance = await shop.create({
            name: params.name,
            location: params.location,
            type: params.type
        }, { raw: true });

        if (params.image) {
            await cdn.upload(params.image, `shop-${instance.id}`);
        }

        Object.assign(instance, { image: cdn.parse(`shop-${instance.id}`) })
        return instance;
    },
};