const Sequelize = require('sequelize');

module.exports = {
    eventId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
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