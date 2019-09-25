module.exports = {
    path: {
        internal: 'createShop',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function (params) {
        const cdn = this.cdn;
        const { shop } = this.sequelizeModels;
        const body = {
            name: params.name,
            location: params.location,
            type: params.type
        };

        if (params.image) {
            Object.assign(body, { image: await cdn.upload(params.image) });
        }

        return shop.create(body,{ raw: true });
    },
};