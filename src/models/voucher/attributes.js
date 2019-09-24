const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    count: Sequelize.INTEGER,
    expiredAt: Sequelize.DATE,
    shopId: {
        type: Sequelize.INTEGER,
    }
};