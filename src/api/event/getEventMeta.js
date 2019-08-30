module.exports = {
    path: {
        api: '/events/:id/meta',
        internal: 'getEventMeta',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event_user } = this.sequelizeModels;
        const numberOfUser = await event_user.count({
            where: {
                eventId: params.id,
            }
        });
        const userState = await event_user.findAll({
            raw: true,
            limit: 1,
            where: {
                eventId: params.id,
                userId: ctx.state.user.id,
            },
        });

        const { status } = userState[0] || { status: 'NORMAL' };

        const isNormal = status === 'NORMAL';
        const isRequest = status === 'REQUESTING';
        const isMember = status === 'MEMBER';
        const isParticipant = status === 'PARTICIPATED'
        const isOwner = status === 'OWNER';

        return {
            numberOfUser,
            isNormal,
            isOwner,
            isRequest,
            isMember,
            isParticipant
        };
    },
};