module.exports = {
    path: {
        api: '/reviews/:event',
        internal: 'getPendingReview',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event_user, review, user } = this.sequelizeModels;
        const already = await review.findAll({
            where: {
                fromUserId: ctx.state.user.id,
                eventId: params.event
            },
            select: [ 'userId' ],
            raw: true,
        });
        const all = await event_user.findAll({
            where: {
                eventId: params.event,
            },
            include: [ user ],
            select: [ 'userId' ],
        });

        const alreadyUsers = already.map((a) => a.userId);
        const result = [];

        for (const eventUser of all) {
            if (alreadyUsers.includes(eventUser.user.userId) || eventUser.userId === ctx.state.user.id) continue;
            result.push(eventUser.user);
        }
        
        return result;
    },
};