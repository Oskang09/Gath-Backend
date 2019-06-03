const Glob              = require('glob');
const ModelService      = require('feathers-sequelize');

module.exports = (app) => {
    const { sequelize } = app.get('services');
    const models = {};
    const services = {};
    for (const file of Glob.sync('../model/**/index.js', { cwd: __dirname })) {
        const model = require(file);
        const modelClass = sequelize.define(model.name, model.attributes, model.options);

        models[model.name] = modelClass;
        services[model.name] = {
            object: modelClass,
            relation: model.association,
            hooks: model.hooks,
        };
    }

    for (const name in models) {
        const model = services[name];
        const object = {
            Model: model.object,
            paginate: model.object.options.paginate,
            events: model.object.options.events,
        };

        if (model.relation) {
            model.relation(models);
        }

        app.use(name, ModelService(object));
        app.service(name)
            .hooks(model.hooks)
            .publish(
                (data) => {
                    const channels = [];
                    if (data.target && data.id) {
                        if (data.target === 'ADMIN') { 
                            channels.push(app.channel(`ADMIN`));
                        } else {
                            channels.push(
                                app.channel(`MERCHANT/${data.id}`)
                            );
                        }
                    }
                    return channels;
                }
            );
    }
    // sequelize.sync();
};