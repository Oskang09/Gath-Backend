const { 
    getItems, 
    getByDot,
} = require('feathers-hooks-common');

const getTransaction = (context) => {
    const { sequelize } = context.app.get('services');
    return sequelize.transaction();
};

const getService = (context, ...services) => {
    const service = {};
    
    for (const service_name of services) {
        const serviceObject = context.app.service(service_name);
        if (serviceObject) {
            service[service_name] = serviceObject;
        }
    }

    if (services.length === 1) {
        return Object.values(service)[0];
    }
    return service;
};

const getSetting = (context, options, withRole = false) => {
    return getByDot(context, `_setting.${options}`);
};

const getModel = (context, ...models) => {
    const modelObj = {};
    for (const model of models) {
        const modelService = context.app.services[model];
        if (modelService) {
            modelObj[model] = modelService.getModel();
        }
    }
    if (models.length === 1) {
        return Object.values(modelObj)[0];
    }
    return modelObj;
};

const getMethod = (context) => {
    return context.method;
};

const getParams = (context, ...params) => {
    const param = {};
    
    for (const name of params) {
        const object = getByDot(context, `params.${name}`);
        if (object) {
            param[name] = object;
        }
    }

    if (params.length === 1) {
        return Object.values(param)[0];
    }
    return param;
};

const getObjectByKey = (object, ...keys) => {
    const obj = {};

    for (const key of Object.keys(object)) {
        if (keys.includes(key)) {
            obj[key] = object[key];
        }
    }

    return obj;
};
module.exports = {
    getTransaction,
    getService,
    getSetting,
    getModel,
    getMethod,
    getItems,
    getByDot,
    getParams,
    getObjectByKey
};