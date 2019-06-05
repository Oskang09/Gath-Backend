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
         * @param {String} [action.uid] Firebase UserId
         */
        USER_SIGNUP: async (context, action) => {
            const newUser = await context.service.create({
                uid: action.uid,
                status: true,
            });
            context.result = newUser;
            return context;
        },
    },
};