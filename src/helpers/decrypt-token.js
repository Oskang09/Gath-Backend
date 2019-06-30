module.exports = {
    name: 'decryptToken',
    item: async function(request) {
        return this.auth.verifyIdToken(request.headers['gath-token']);
    }
};