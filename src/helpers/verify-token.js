module.exports = {
    name: 'decryptToken',
    item: async function(request, reply) {
        try {
            return this.auth.verifyIdToken(request.headers['gath-token']);
        } catch (error) {
            return reply.json(error.message);
        }
    }
};