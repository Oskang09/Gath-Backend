const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    shopId: Sequelize.INTEGER,
};