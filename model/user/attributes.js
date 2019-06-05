const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uid: {
        type: Sequelize.STRING,
        unique: true,
    },
    status: Sequelize.BOOLEAN,
};
