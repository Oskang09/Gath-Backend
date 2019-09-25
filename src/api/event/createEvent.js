module.exports = {
    path: {
        api: '/events',
        internal: 'createEvent',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event, event_user } = this.sequelizeModels;
        return this.tsql(
            async (transaction) => {
                const body = {
                    shop: params[2].shop,
                    location: params[2].location,
                    desc: params[1],
                    type: params[0].type,
                    name: params[0].name,
                    start_time: params[0].start,
                    status: 'PENDING',
                };
                if (params[0].banner) {
                    Object.assign(body, { image: await this.cdn.upload(params[0].banner) });
                }
                const result = await event.create(body, { transaction });
                await event_user.create({
                    eventId: result.id,
                    userId: ctx.state.user.id,
                    status: 'OWNER',
                }, { transaction });
        
                return result;
            }
        );
    },
};