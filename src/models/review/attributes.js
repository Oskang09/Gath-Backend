const Sequelize = require('sequelize');

module.exports = {
    fromUserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    toUserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    eventId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },

    badge: Sequelize.STRING,
    comment: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    }
};