const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    
    image: Sequelize.STRING,
    type: Sequelize.STRING,
    name: Sequelize.STRING,
    desc: Sequelize.STRING,
    start_time: Sequelize.DATE,
    location: Sequelize.STRING,
    shop: Sequelize.STRING,

    /**
     * @enum EventStatus
     * 
     * PENDING - Event just created
     * START - Event started 
     * END - Event ended
     */
    status: Sequelize.STRING,
    deletedAt: Sequelize.DATE,
};
