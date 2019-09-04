const Sequelize = require('sequelize');

module.exports = {
    eventId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,

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