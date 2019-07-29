module.exports = {
    path: {
        api: '/config',
        internal: 'serverConfig',
    },
    method: 'GET',
    handler: async function () {
        return {
            constellation: [
                'Aries',
                'Taurus',
                'Gemini',
                'Cancer',
                'Leo',
                'Virgo',
                'Libra',
                'Scorpio',
                'Sagittarius',
                'Capricorn',
                'Aquarius',
                'Pisces'
            ],
            personality: [
                {

                }
            ],
            badges: [
                'cat-lover',
                'good-choice',
                'hakka-boi',
                'pro-gamer',
                'tool-man'
            ]
        };
    }
};