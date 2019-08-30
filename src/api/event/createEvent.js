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
                    desc: params[1],
                    name: params[0].name,
                    start_time: params[0].start,
                    type: params[0].type,
                    status: 'PENDING',
                    public: true,
                    code: null,
                    comments: [
                        {
                            comment: params[1],
                            by: ctx.state.user.id,
                            when: Date.now(),
                        }
                    ]
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