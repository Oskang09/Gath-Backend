module.exports = {
    path: {
        api: '/posts',
        internal: 'getPost',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const { post, shop } = this.sequelizeModels;
        const instance = await post.findAll({
            include: [ shop ]
        });
        return instance;
    },
};