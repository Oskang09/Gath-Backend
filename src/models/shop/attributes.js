const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    locate: Sequelize.STRING,
    operation_hours: {
        type: Sequelize.JSONB,
        defaultValue: {
            monday: '',
            tueday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
        },
    },
};