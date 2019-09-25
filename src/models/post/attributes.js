const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image: Sequelize.STRING,
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    type: Sequelize.STRING,
    voucherId: {
        type: Sequelize.INTEGER,
        references: {
            table: 'public.vouchers',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    shopId: {
        type: Sequelize.INTEGER,
        references: {
            table: 'public.shops',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
};