module.exports = {
    path: {
        api: '/users/profile',
        internal: 'userProfile',
    },
    method: 'POST',
    before: [
        'verifyToken'
    ],
    handler: async function(params) {
        const { user } = this.sequelizeModels;
        const instance = await user.findByPk(request.user.id);
        if (params.badge) {
            const badges = {};
            for (const badge of params.badge) {
                badges[badge] = 1;
            }
            params.badge = badges;
        }

        if (params.avatar) {
            try {
                params.avatar = await this.cdn.upload(params.avatar, request.user.uid);
            } catch (error) {
                delete params.avatar;
            }
        }

        const updated = await instance.update(params);
        if (updated.avatar) {
            updated.avatar = this.cdn.parse(updated.avatar);
        }
        return updated;
    },
};