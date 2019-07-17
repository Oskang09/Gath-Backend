const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    avatar: Sequelize.STRING,
    locate: Sequelize.STRING,
    operation_hours: Sequelize.JSONB,
};