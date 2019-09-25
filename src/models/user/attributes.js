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
    device_token: {
        type: Sequelize.STRING,
        unique: true
    },
    utag: {
        type: Sequelize.STRING,
        unique: true,
    },
    phone: Sequelize.STRING,
    
    avatar: Sequelize.STRING,
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    constellation: Sequelize.STRING,
    gender: Sequelize.STRING,
    desc: Sequelize.STRING,
    personality: Sequelize.ARRAY(Sequelize.STRING),
    status: Sequelize.STRING,

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};