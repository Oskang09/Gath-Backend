const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    organizerId: Sequelize.STRING,
    
    name: Sequelize.STRING,
    desc: Sequelize.STRING,
    banner: Sequelize.STRING,

    start_time: Sequelize.STRING,
    end_time: Sequelize.STRING,

    location: Sequelize.STRING,
    contact: Sequelize.JSONB,
    category: Sequelize.ARRAY(Sequelize.STRING),
    hashtag: Sequelize.ARRAY(Sequelize.STRING),
    status: Sequelize.STRING,
};
