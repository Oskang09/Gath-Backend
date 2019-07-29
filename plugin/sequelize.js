const Sequelize    = require('sequelize');
const Glob         = require('glob');

module.exports = function (setting, globalScope) {
    const sequelize = new Sequelize(setting.url, setting.options);
    const models = {};
    const association = [];
    for (const file of Glob.sync('../src/models/**/index.js', { cwd: __dirname })) {
        const model = require(file);
        const modelClass = sequelize.define(model.name, model.attributes, model.options);
        models[model.name] = modelClass;

        if (model.association) {
            association.push(model.association);
        }
    }

    for (const associate of association) {
        associate(models);
    }

    globalScope.sequelize = sequelize;
    globalScope.sequelizeModels = models;    
    sequelize.sync();
};