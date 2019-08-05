module.exports = {
    path: {
        api: '/users/profile',
        internal: 'updateProfile',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { user } = this.sequelizeModels;
        const instance = await user.findByPk(ctx.state.user.id);
        if (params.badge) {
            const badges = {};
            for (const badge of params.badge) {
                badges[badge] = (instance.badge[badge] || 0) + 1;
            }
            params.badge = badges;
        }

        if (params.avatar) {
            await this.cdn.upload(params.avatar, `users-${ctx.state.user.id}`);
        }

        const updated = await instance.update(params);
        return updated;
    },
};