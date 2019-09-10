module.exports = {
    path: {
        api: '/events/:id/comments',
        internal: 'createComment',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event } = this.sequelizeModels;
        const result = await event.findByPk(params.id);
        const comment = {
            comment: params.comment,
            by: ctx.state.user.id,
            name: ctx.state.user.name,
            when: Date.now()
        };
        await result.update({ comments: [ comment, ...result.comments ] });
        return result;
    },
};