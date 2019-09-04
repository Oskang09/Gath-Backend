const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    type: Sequelize.STRING,
    voucherId: Sequelize.INTEGER,
    shopId: Sequelize.INTEGER,
};