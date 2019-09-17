const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fromUserId: Sequelize.INTEGER,
    toUserId: Sequelize.INTEGER,
    eventId: Sequelize.INTEGER,

    badge: Sequelize.STRING,
    comment: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
    }
};


/*
    fromUser, toUserId !== same
    event_user.include => eventId, toUser && not repeating
*/