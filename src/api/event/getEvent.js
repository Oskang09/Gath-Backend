module.exports = {
    path: {
        api: '/events',
        internal: 'getEvents',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const { event } = this.sequelizeModels;
        const result = await event.findAll();
        return result;
    },
};