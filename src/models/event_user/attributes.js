const Sequelize = require('sequelize');

module.exports = {
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

    /**
     * @enum User's EventStatus
     * 
     * OWNER - Event Owner
     * REQUESTING - Requesting join event
     * MEMBER - Member of event
     * PARTICIPATED - Member that checked in
     */
    status: Sequelize.STRING,
};