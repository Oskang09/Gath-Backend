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
                const result = await event.create({
                    shopId: params[2].id,
                    location: params[2].locate,
                    desc: params[1],
                    type: params[0].type,
                    name: params[0].name,
                    start_time: params[0].start,
                    status: 'PENDING',
                }, { transaction });
                await event_user.create({
                    eventId: result.id,
                    userId: ctx.state.user.id,
                    status: 'OWNER',
                }, { transaction });
                
                if (params[0].banner) {
                    await this.cdn.upload(params[0].banner, `event-${result.id}`);
                }
        
                return result;
            }
        );
    },
};