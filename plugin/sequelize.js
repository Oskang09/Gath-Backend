const Sequelize    = require('sequelize');
const Glob         = require('glob');

module.exports = function (fastify, options, next) {
    options.options.logging = function () {};
    options.options.benchmark = true;

    const sequelize = new Sequelize(options.url, options.options);
    const models = {};
    const association = [];
    for (const file of Glob.sync('../src/model/**/index.js', { cwd: __dirname })) {
        const model = require(file);
        const modelClass = sequelize.define(model.name, model.attributes, model.options);
        models[model.name] = modelClass;

        if (model.association) {
            association.push(model.association);
        }

        if (model.options.crud) {
            for (const key of Object.keys(model.options.crud)) {
                const action = model.options.crud[key];
                const api = require(`../src/util/crud/${key}`);
                const module = api(action, modelClass);
                if (Array.isArray(module.preValidation)) {
                    const middleware = [];
                    module.preValidation.forEach(
                        (mw) => {
                            if (typeof mw === 'string') {
                                middleware.push( require(`../src/middleware/${mw}`)() );
                            } else if (typeof mw === 'object') {
                                middleware.push(
                                    require(`../src/middleware/${mw.name}`)(mw.params)
                                );
                            }
                        }
                    );
                    module.preValidation = middleware;
                }
                fastify.route(module);
            }
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