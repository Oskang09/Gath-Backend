const Sequelize = require('sequelize');

module.exports = {
    voucherId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    usedAt: Sequelize.DATE,
    receiveAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    }
};