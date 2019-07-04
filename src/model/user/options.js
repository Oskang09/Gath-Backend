module.exports = {
    timestamps: true,
    freezeTableName: true,
    tableName: 'users',
    crud: {
        create: {
            url: '/users',
            middleware: [ 'verifyToken' ]
        },
        read: {
            url: '/users',
        },
        get: {
            url: '/users/:id',
        },
        update: {
            url: '/users/:id',
        },
        delete: {
            url: '/users/:id',
        }
    },
};