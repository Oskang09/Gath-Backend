module.exports = {
    path: {
        api: '/events/:id',
        internal: 'deleteEvent',
    },
    method: 'DELETE',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event } = this.sequelizeModels;
        const instance = await event.findByPk(params.id);
        if (!instance) {
            throw "MISSING_EVENT";
        }

        const meta = await event_user.findOne({
            where: {
                eventId: instance.id,
                userId: ctx.state.user.id,
            }
        });

        if (meta.status !== 'OWNER') {
            throw "NOT_EVENT_OWNER";
        }

        await instance.destroy();
        return instance;
    },
};