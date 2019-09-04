const Sequelize = require('sequelize');

module.exports = {
    voucherId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    usedAt: Sequelize.DATE,
    receiveAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    }
};