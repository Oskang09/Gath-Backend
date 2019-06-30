module.exports = {
    method: 'GET',
    url: '/events',
    handler: async function (request, reply) {
        const res = await this.nearbyPlaces();
        return reply.json(res);
    }
};