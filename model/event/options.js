module.exports = {
    timestamps: false,
    freezeTableName: true,

    paginate: {
        default: 12,
        max: 100
    },
    tableName: 'events',
    events: [ 'modified' ],
    authorized: true,
};