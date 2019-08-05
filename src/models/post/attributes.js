const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    shopId: Sequelize.INTEGER,
};