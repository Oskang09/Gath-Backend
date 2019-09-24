module.exports = {
    path: {
        api: '/events/:id',
        internal: 'updateEvent',
    },
    method: 'PUT',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event } = this.sequelizeModels;
        const instance = await event.findByPk(params.id);
        if (!instance) {
            throw "MISSING_INSTANCE";
        }
        
        if (params[0].banner) {
            await this.cdn.upload(params[0].banner, `event-${instance.id}`);
        }

        return instance.update({
            shop: params[2].shop,
            location: params[2].location,
            desc: params[1],
            type: params[0].type,
            name: params[0].name,
            start_time: params[0].start,
        });
    },
};