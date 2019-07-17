module.exports = {
    path: {
        api: '/users/login',
        internal: 'userLogin',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function (params) {
        const { user } = this.sequelizeModels;
        let instance = await user.findOne({
            where: {
                uid: params.uid
            }
        });
        if (!instance) {
            instance = await user.create({
                uid: params.uid,
                phone: params.phone,
                status: 'NEW',
            });
        }
        return instance;
    },
};