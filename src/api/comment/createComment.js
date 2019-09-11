module.exports = {
    path: {
        api: '/events/:id/comments',
        internal: 'createComment',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { comment } = this.sequelizeModels;
        const result = await comment.create({
            comment: params.comment,
            userId: ctx.state.user.id,
            eventId: params.id,
        });
        return result;
    },
};