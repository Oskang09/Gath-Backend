const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    organizerId: Sequelize.INTEGER,
    shopId: Sequelize.INTEGER,
    
    type: Sequelize.STRING,
    name: Sequelize.STRING,
    desc: Sequelize.STRING,
    start_time: Sequelize.DATE,
    location: Sequelize.STRING,

    /**
     * @enum EventStatus
     * 
     * PENDING - Event just created
     * START - Event started 
     * END - Event ended
     */
    status: Sequelize.STRING,
    comments: {
        type: Sequelize.JSONB,
        defaultValue: [],
    },

};
