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
    utag: {
        type: Sequelize.STRING,
        unique: true,
    },
    phone: Sequelize.STRING,
    
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    constellation: Sequelize.STRING,
    gender: Sequelize.STRING,
    desc: Sequelize.STRING,
    personality: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    badge: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    status: Sequelize.STRING,

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};