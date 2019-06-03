const camelCase = require('camelcase');
const pluralize = require('pluralize');
const { getService } = require('@getters');

module.exports = (targetService, type) => async (context, action) => {
    if (!action.id) {
        throw Error('action.missing_id');
    }
    const instance = await context.service.getModel().findByPk(context.id);
    if (!instance) {
        throw Error('action.missing_instance');
    }

    const name = [
        pluralize(targetService),
        targetService,
    ];
    const method = [
        camelCase([type, name[0]]),
        camelCase([type, name[1]])
    ];
    if (!instance[`${method[0]}`] && !instance[`${method[1]}`]) {
        throw Error('action.invalid_usage');
    }

    if (instance[method[0]]) {
        await instance[method[0]](action.id);
    } else {
        await instance[method[1]](action.id);
    }

    context.service.emit('modified', {
        id: instance.merchantId,
        target: 'MERCHANT'
    });
    getService(context, targetService).emit('modified', {
        id: instance.merchantId,
        target: 'MERCHANT'
    });
    context.result = true;
    return context;
};