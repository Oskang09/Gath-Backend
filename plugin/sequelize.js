const Sequelize    = require('sequelize');
const Glob         = require('glob');

module.exports = function (fastify, options, next) {
    options.options.logging = function () {};
    options.options.benchmark = true;

    const sequelize = new Sequelize(options.url, options.options);
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

    fastify.decorate('sequelizeModels', models);
    fastify.decorate('sequelize', sequelize);
    
    sequelize.sync();
    return next();
};