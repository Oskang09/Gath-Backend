module.exports = {
    path: {
        api: '/users/profile',
        internal: 'userProfile',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { user } = this.sequelizeModels;
        const instance = await user.findByPk(ctx.state.user.id, { raw: true });
        return instance;
    },
};