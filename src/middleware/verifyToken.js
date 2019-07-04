module.exports = (mustHaveToken = true) => 
    async function(request, reply, next) {
        if (request.headers['gath-token']) {
            request.user = this.auth.verifyIdToken(request.headers['gath-token']);
        } else if (mustHaveToken) {
            return reply.error("Missing headers 'gath-token'");
        }
        return next();
    };