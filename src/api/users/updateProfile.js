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
        if (params.avatar) {
            await this.cdn.upload(params.avatar, `user-${ctx.state.user.id}`);
        }
        try {
            const updated = await instance.update(params);
            return updated;
        } catch (error) {
            const validateError = error.errors[0];
            if (validateError.type === 'unique violation' && validateError.path === 'utag') {
                throw "UTAG_UNIQUE_VIOLATION";
            }
        }
    },
};