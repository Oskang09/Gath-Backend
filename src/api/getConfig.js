module.exports = {
    path: {
        api: '/config',
        internal: 'serverConfig',
    },
    method: 'GET',
    handler: async function () {
        return {
            shopType: [
                { value: 'BEVERAGE', display: 'Beverage' },
                { value: 'RESTAURANT', display: 'Restaurant' },
                { value: 'BAR', display: 'Bar' },
            ],
            postType: [
                { value: 'VOUCHER', display: 'Voucher', icon: 'local-activity' },
                { value: 'UPCOMING', display: 'Upcoming', icon: 'update' },
                { value: 'UPDATE', display: 'News', icon: 'local-offer' },
            ],
            eventType: [
                { value: 'DINING', display: 'Dining', icon: 'local-dining' },
                { value: 'DRINK', display: 'Drink', icon: 'local-cafe' },
                { value: 'BGAME', display: 'Board Game', icon: { package: 'fontawesome5', name: 'chess-board' } },
                { value: 'OGAME', display: 'Online Game', icon: { package: 'materialcommunityicons', name: 'steam' } }
            ],
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
            personality: {
                Listening: {
                    package: 'MaterialIcons',
                    icon: 'hearing',
                },
                'Life Advising': {
                    package: 'Entypo',
                    icon: 'flag',
                },
                Gaming: {
                    package: 'FontAwesome',
                    icon: 'gamepad',
                },
                Business: {
                    package: 'MaterialCommunityIcons',
                    icon: 'cash',
                },
                Outdoor: {
                    package: 'Foundation',
                    icon: 'foot',
                },
                Sport: {
                    package: 'FontAwesome',
                    icon: 'soccer-ball-o',
                },
                Technology: {
                    package: 'Entypo',
                    icon: 'tablet-mobile-combo',
                },
                Music: {
                    package: 'Ionicons',
                    icon: 'ios-musical-notes',
                },
                'Board Game': {
                    package: 'FontAwesome5',
                    icon: 'chess',
                },
                'Pet Lover': {
                    package: 'MaterialIcons',
                    icon: 'pets',
                },
                'Coding': {
                    package: 'Entypo',
                    icon: 'code'
                }
            },
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