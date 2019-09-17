const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },

    /**
     * @enum Notification's Types
     * 
     * VIEW_EVENT - go to the event details
     * REVIEW - event badges review ( EXTRA 'event' must provide )
     * NONE - just a useless message
     */
    action: Sequelize.STRING,

    about: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    eventId: Sequelize.INTEGER,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    }
};