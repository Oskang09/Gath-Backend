module.exports = {
    path: {
        api: '/events',
        internal: 'createEvent',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event } = this.sequelizeModels;
        const result = await event.create({
            organizerId: ctx.state.user.id,
            shopId: params[2].shop.id,
            location: params[2].shop.locate,
            name: params[0].name,
            desc: params[1],
            start_time: params[0].start,
            type: params[0].type,
            tags: params[0].tags,
            status: 'PENDING'
        });

        if (params.banner) {
            await this.cdn.upload(params.banner, `events-${event.id}`);
        }

        return result;
    },
};