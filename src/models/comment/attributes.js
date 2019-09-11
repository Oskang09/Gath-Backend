const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    },
    userId: Sequelize.INTEGER,
    eventId: Sequelize.INTEGER,
};