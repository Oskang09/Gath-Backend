const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    count: Sequelize.INTEGER,
    expiredAt: Sequelize.DATE,
    shopId: Sequelize.INTEGER,
};