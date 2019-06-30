module.exports = {
    method: 'PUT',
    url: '/user/:uid',
    schema: {
        headers: {
            'gath-token': 'string',
        },
        params: {
            uid: 'string'
        },
        body: {
            name: 'string',
            age: 'number',
            constellation: 'string',
            sex: 'string',
            desc: 'string',
            personality: {
                type: 'array',
                items: { type: 'string' }
            },
            badge: {
                type: 'object',
                
            }
        }
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
        if (!userData) {
            return reply.error('api.invalid_user');
        }
        const updated = await userData.update(request.body);
        return reply.json(updated);
    }
};