module.exports = {
    path: {
        api: '/users/profile',
        internal: 'userProfile',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        
    },
};