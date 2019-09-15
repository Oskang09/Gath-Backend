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
     * ACTION - event badges review ( EXTRA 'event' must provide )
     * MESSAGE - just a useless message
     */
    type: Sequelize.STRING,
    event: Sequelize.INTEGER,

    about: Sequelize.STRING,
    read: Sequelize.BOOLEAN,
    userId: Sequelize.INTEGER,
};