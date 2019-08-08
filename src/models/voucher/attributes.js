const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING,
    condition: Sequelize.ARRAY(Sequelize.STRING),
    count: Sequelize.INTEGER,
    shopId: Sequelize.INTEGER,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    }
};