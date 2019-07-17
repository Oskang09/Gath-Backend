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
    utag: Sequelize.STRING,
    phone: Sequelize.STRING,
    avatar: Sequelize.STRING,
    
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    constellation: Sequelize.STRING,
    gender: Sequelize.STRING,
    desc: Sequelize.STRING,
    personality: Sequelize.ARRAY(Sequelize.STRING),
    badge: Sequelize.JSONB,
    status: Sequelize.STRING,

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};