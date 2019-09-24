const Sequelize = require('sequelize');

module.exports = {
    voucherId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            table: 'public.vouchers',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            table: 'public.users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    usedAt: Sequelize.DATE,
    receiveAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    }
};