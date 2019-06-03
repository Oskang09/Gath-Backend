const BatchLoader = require('@feathers-plus/batch-loader');

const { filterFieldFromArrayObject } = require('@utils');
const { getService } = require('@getters');
const { loaderFactory } = BatchLoader;

/**
 * @param {HookContext} [context] Hook context object 
 * @param {Object} [junction] Many to many relation definition
 * @param {String} [junction.through] Through junction model name
 * @param {String} [junction.target] Target relation model name
 * @param {String} [junction.sourceKey] Source key name
 * @param {String} [junction.targetKey] Target key name
 */
const manyToMany = (context, junction) => {
    const model = getService(context, junction.through);
    const junctionModel = async (key) => {
        const instance = await model.find({
            query: {
                [junction.sourceKey]: key,
                $select: [ junction.targetKey ],
            },
            paginate: false,
        });
        return instance.map(junc => junc[junction.targetKey]);
    };
    const targetModel = manyToOne(context, junction.target);
    return async (key, fields) => {
        let data = await targetModel(await junctionModel(key));
        if (Array.isArray(fields) && fields.length > 0) {
            data = filterFieldFromArrayObject(data, ...fields);
        }
        return data;
    };
};

/**
 * @param {HookContext} [context] Hook context object 
 * @param {String} [target] Target model name for querying
 */
const manyToOne = (context, target) => {
    const model = getService(context, target);
    const pk = model.getModel().primaryKeyAttribute;
    const targetModel = loaderFactory(
        model,
        pk,
        false,
        { paginate: false }
    )(context);

    return async (key, fields) => {
        let data = Array.isArray(key) ? 
            await targetModel.loadMany(key) : 
            await targetModel.load(key);
        if (Array.isArray(fields) && fields.length > 0) {
            data = filterFieldFromArrayObject(data, ...fields);
        }
        return data;
    };
};

/**
 * @param {HookContext} [context] Hook context object 
 * @param {Object} [target] Relation object definition
 * @param {String} [target.target] Target model name
 * @param {String} [target.foreignKey] Foreign key fields
 */
const oneToMany = (context, target) => {
    const model = getService(context, target.target);
    const pk = model.getModel().primaryKeyAttribute;

    const targetModel = async (key) => {
        const instance = await model.find({
            query: {
                [target.foreignKey]: key,
                $select: [ pk ]
            },
            paginate: false,
        });
        return instance.map(junc => junc[pk]);
    };

    const loaders = loaderFactory(
        model,
        pk,
        false,
        { paginate: false }
    )(context);
    return async (key, fields) => {
        let data = await loaders.loadMany(await targetModel(key));
        if (Array.isArray(fields) && fields.length > 0) {
            data = filterFieldFromArrayObject(data, ...fields);
        }
        return data;
    };
}



module.exports = {
    manyToMany,
    manyToOne,
    oneToMany
};