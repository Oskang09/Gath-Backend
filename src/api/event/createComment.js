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
        result.comments.push({
            comment: params.comment,
            by: ctx.state.user.id,
            when: Date.now()
        });
        await result.save();
        return result;
    },
};