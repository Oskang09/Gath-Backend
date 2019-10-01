module.exports = {
    path: {
        api: '/events/:id/comments',
        internal: 'createComment',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { comment, event_user, user } = this.sequelizeModels;
        const eventUsers = await event_user.findAll({
            where: {
                eventId: params.id
            },
            include: [ user ],
            select: [ 'userId' ],
        });

        const asyncNotify = [
            await comment.create({
                comment: params.comment,
                userId: ctx.state.user.id,
                eventId: params.id,
            })
        ];

        for (const eventUser of eventUsers) {
            if (eventUser.user.id === ctx.state.user.id) {
                return;
            }
            asyncNotify.push(
                this.pushNotification({
                    target: eventUser.user.device_token,
                    data: {
                        action: 'VIEW_EVENT',
                        event: params.id.toString(),
                    },
                    title: `New comment from ${ctx.state.user.name}`,
                    body: params.comment,
                })
            );
        }

        return Promise.all(asyncNotify);
    },
};