const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    },
    eventId: {
        type: Sequelize.INTEGER,
        references: {
            table: 'public.events',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            table: 'public.users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
};