const Sequelize = require('sequelize');

module.exports = {
    key: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    value: Sequelize.JSONB,
    etag: Sequelize.STRING,
};
