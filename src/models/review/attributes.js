const Sequelize = require('sequelize');

module.exports = {
    fromUserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            table: 'public.users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    toUserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            table: 'public.users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    eventId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            table: 'public.events',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },

    badge: Sequelize.STRING,
    comment: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    }
};