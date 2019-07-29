module.exports = {
    path: {
        api: '/users/profile',
        internal: 'updateProfile',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    after: [
        {
            middleware: 'parseImage',
            params: {
                fields: [ 'avatar' ]
            }
        }
    ],
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
            try {
                params.avatar = await this.cdn.upload(params.avatar, ctx.state.user.uid);
            } catch (error) {
                delete params.avatar;
            }
        }

        const updated = await instance.update(params);
        return updated;
    },
};