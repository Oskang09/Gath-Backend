module.exports = {
    path: {
        api: '/events/:id',
        internal: 'getEvent',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event, event_user } = this.sequelizeModels;

        if (params.id === 'running') {
            const running = await event.findOne({
                where: {
                    status: 'START'
                },
                include: [{
                    model: event_user,
                    where: {
                        userId: ctx.state.user.id
                    }
                }],
            });
            if (!running) {
                throw "NO_EVENT_RUNNING";
            }
            return running;
        }

        const result = await event.findByPk(params.id);
        return result;
    },
};