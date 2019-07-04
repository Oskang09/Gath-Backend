const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    banner: Sequelize.STRING,
    start_date: Sequelize.STRING,
    end_date: Sequelize.STRING,
    desc: Sequelize.STRING,
    type: Sequelize.STRING,
    shopId: Sequelize.INTEGER,
};