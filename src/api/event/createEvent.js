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
                    organizerId: ctx.state.user.id,
                    shopId: params[2].shop.id,
                    location: params[2].shop.locate,
                    name: params[0].name,
                    desc: params[1],
                    start_time: params[0].start,
                    type: params[0].type,
                    tags: params[0].tags,
                    status: 'PENDING',
                    public: true,
                    code: null,
                }, { transaction });
                const bridge = await event_user.create({
                    eventId: result.id,
                    userId: result.organizerId,
                    status: 'OWNER',
                }, { transaction });
                
                if (params.banner) {
                    await this.cdn.upload(params.banner, `event-${result.id}`);
                }
        
                return { event: result, event_user: bridge };
            }
        );
    },
};