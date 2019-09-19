module.exports = {
    path: {
        api: '/reviews',
        internal: 'createReview',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { review } = this.sequelizeModels;
        const fromUser = ctx.state.user;
        const reviewInstance = await review.findOne({
            where: {
                fromUserId: fromUser.id,
                toUserId: params.target,
                eventId: params.event
            }
        });
        if (reviewInstance) {
            throw "ALREADY_COMMENT";
        }

        return review.create({
            fromUserId: fromUser.id,
            toUserId: params.target,
            eventId: params.event,
            badge: params.badge,
            comment: params.comment,
        });
    },
};