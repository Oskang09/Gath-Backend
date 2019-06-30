module.exports = {
    method: 'POST',
    url: '/user/:uid',
    schema: {
        headers: {
            'gath-token': 'string',
        },
        params: {
            uid: 'string'
        },
        body: {
            phone: 'string',
        }
    },
    async handler(request, reply) {
        const { phone } = request.body;
        const { uid } = request.params;
        const { user } = this.sequelizeModels;

        try {
            await this.helpers.decryptToken(request);
        } catch (error) {
            return reply.error('firebase.invalid_token');
        }
        
        let userData = await user.findByPk(uid);
        if (!userData) {
            userData = await user.create({
                uid, phone
            });
        }
        return reply.json(userData);
    }
};