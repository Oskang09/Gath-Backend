const got = require('got');

module.exports = async function (fastify, options, next) {
    const client = got.extend({
        baseUrl: 'https://places.cit.api.here.com/',
    });
    fastify.decorate('nearbyPlaces', 
        async (query, lat, lng) => {
            const response = await client.get('/places/v1/autosuggest', {
                query: new URLSearchParams([
                    ['q', query],
                    ['at', `${lat},${lng}`],
                    ['app_id', 'eFlfKMT2AWLaOLgcUdRo'],
                    ['app_code', 'ARVVTl_Q3KpachMu6Pul6g']
                ])
            });
            return JSON.parse(response.body);
        }
    );
    return next();
};