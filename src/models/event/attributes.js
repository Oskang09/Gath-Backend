const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    organizerId: Sequelize.INTEGER,
    shopId: Sequelize.INTEGER,
    voucherId: Sequelize.INTEGER,
    
    name: Sequelize.STRING,
    desc: Sequelize.STRING,

    start_time: Sequelize.STRING,
    type: Sequelize.STRING,
    code: Sequelize.STRING,
    public: Sequelize.BOOLEAN,
    tags: Sequelize.STRING,
    location: Sequelize.STRING,
    status: Sequelize.STRING,
};
