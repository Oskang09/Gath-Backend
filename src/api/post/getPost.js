module.exports = {
    path: {
        api: '/posts',
        internal: 'getPost',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const { post } = this.sequelizeModels;
        const instance = await post.findAll({ raw: true });
        return instance;
    },
};