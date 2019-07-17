const Sequelize = require('sequelize');

module.exports = {
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    password: Sequelize.STRING,
    token: Sequelize.STRING,
};