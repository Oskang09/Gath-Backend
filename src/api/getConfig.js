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
                    display: 'Listener',
                    icon: '',
                },
                {
                    display: 'Life Adviser',
                    icon: '',
                },
                {
                    display: 'Gamer',
                    icon: '',
                },
                {
                    display: 'K-Pop',
                    icon: '',
                },
                {
                    display: 'Business',
                    icon: '',
                },
                {
                    display: 'Anime',
                    icon: '',
                },
                {
                    display: 'Outdoor',
                    icon: '',
                },
                {
                    display: 'Sport',
                    icon: '',
                },
                {
                    display: 'Technology',
                    icon: '',
                },
                {
                    display: 'Musician',
                    icon: '',
                },
                {
                    display: 'Board Gamer',
                    icon: '',
                },
                {
                    display: 'Pet Lover',
                    icon: '',
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