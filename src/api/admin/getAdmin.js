module.exports = {
    path: {
        internal: 'getAdmin',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function({ token }) {
        const { admin } = this.sequelizeModels;
        const instance = await admin.findOne({
            where: { token },
            raw: true
        });
        return instance;
    },
};