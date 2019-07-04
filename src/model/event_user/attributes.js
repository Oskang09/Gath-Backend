const Sequelize = require('sequelize');

module.exports = {
    eventId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    status: Sequelize.STRING,
};