module.exports = {
    path: {
        api: '/events/:id/users',
        internal: 'getEventMeta',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const { event_user, user } = this.sequelizeModels;
        const users = await event_user.findAll({
            raw: true,
            select: ['userId', 'status'],
            where: {
                eventId: params.id,
            },
        });

        const state = user.findAll({
            raw: true,
            where: {
                id: users.map((u) => u.userId)
            }
        });

        return state.map(
            (s) => Object.assign({ eventStatus: users.find(u => u.userId === s.id).status }, s)
        );
    },
};