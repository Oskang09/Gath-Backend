const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    organizerId: Sequelize.STRING,
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    banner: Sequelize.STRING,
};
