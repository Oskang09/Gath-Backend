const Sequelize = require('sequelize');

module.exports = {
    uid: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    role: Sequelize.STRING,
    utag: Sequelize.STRING,
    phone: Sequelize.STRING,
    avatar: Sequelize.STRING,
    
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    constellation: Sequelize.STRING,
    sex: Sequelize.STRING,
    desc: Sequelize.STRING,
    personality: Sequelize.ARRAY(Sequelize.STRING),
    badge: Sequelize.JSONB,
    status: Sequelize.STRING,

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};
