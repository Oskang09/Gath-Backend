module.exports = {
    timestamps: false,
    freezeTableName: true,

    paginate: {
        default: 12,
        max: 100
    },
    tableName: 'users',
    events: [ 'modified' ],
    authorized: true,
    actions: {
        /**
         * @param {Object} [action] Action payload
         * @param {String} [action.type] Action type ( should same with key )
         * @param {String} [action.phone]
         * @param {String} [action.email]
         * @param {String} [action.password]
         * @param {String} [action.name]
         */
        USER_SIGNUP: async (context, action) => {
            const { auth } = context.app.get('services').firebase;
            const user = await auth.createUser({
                email: action.email,
                phoneNumber: action.phone,
                password: action.password,
                displayName: action.name,
                emailVerified: false,
                disabled: false,
            });
            const newUser = await context.service.create({
                uid: user.uid,
                status: true,
            });
            context.result = newUser;
            return context;
        },
    },
};