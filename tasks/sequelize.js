const Sequelize         = require('sequelize');
const sequelizeConfig   = require('../config/sequelize');

Sequelize.postgres.DECIMAL.parse = (value) => parseFloat(value);
const sequelize = new Sequelize(
    sequelizeConfig.url,
    sequelizeConfig.options
);

module.exports = sequelize;