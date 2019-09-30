module.exports = {
    path: {
        api: '/config',
        internal: 'serverConfig',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function (_, ctx) {
        return {
            profile: ctx.state.user.id,
            shopType: [
                { value: 'BEVERAGE', display: 'Beverage', icon: { package: 'simplelineicons', name: 'cup' } },
                { value: 'RESTAURANT', display: 'Restaurant', icon: 'restaurant' },
                { value: 'BAR', display: 'Bar', icon: { package: 'fontawesome5', name: 'wine-glass' } },
            ],
            postType: [
                { value: 'VOUCHER', display: 'Voucher', icon: 'local-activity' },
                { value: 'UPDATE', display: 'Update', icon: 'update' },
            ],
            eventType: [
                { value: 'DINING', display: 'Dining', icon: { package: 'materialicons', name: 'local-dining' } },
                { value: 'DRINK', display: 'Yum Cha', icon: { package: 'materialicons', name: 'local-cafe' } },
                { value: 'SHARE', display: 'Sharing', icon: { package: 'materialcommunityicons', name: 'microphone-variant' } },
                { value: 'BGAME', display: 'Board Game', icon: { package: 'fontawesome5', name: 'chess-board' } },
                { value: 'OGAME', display: 'Online Game', icon: { package: 'materialcommunityicons', name: 'steam' } },
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
                'empty-badge',
                'cat-lover',
                'good-choice',
                'hakka-boi',
                'pro-gamer',
                'tool-man'
            ]
        };
    }
};