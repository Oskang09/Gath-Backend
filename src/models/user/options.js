module.exports = {
    timestamps: true,
    freezeTableName: true,
    tableName: 'users',
    crud: {
        read: {
            url: '/users',
            config: {
                middleware: [ 'verifyToken' ],
                accessor: 'readUsers',
            },
        },
        get: {
            url: '/users/:id',
            config: {
                middleware: [ 'verifyToken' ],
                accessor: 'getUser',
            },
        },
    },
};