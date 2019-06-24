const Sequelize = require('sequelize');

module.exports = {
    uid: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    utag: {
        type: Sequelize.STRING,
        unique: true,
    },
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    avatar: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};
