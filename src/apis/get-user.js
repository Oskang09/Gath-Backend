module.exports = {
    method: 'GET',
    url: '/user/:uid',
    schema: {
        headers: {
            'gath-token': 'string',
        },
        params: {
            uid: 'string'
        },
    },
    async handler(request, reply) {
        const { uid } = request.params; 
        const { user } = this.sequelizeModels;

        try {
            await this.helpers.decryptToken(request);
        } catch (error) {
            return reply.error('firebase.invalid_token');
        }
        
        const userData = await user.findByPk(uid);
        return reply.json(userData);
    }
};