const { 
    authorized,
    apply_setting,
    parameterize_query,
    
    apply_id,
    access_query,
    actions,
    image_crud,
    instance_limit,
    load
} = require('@hooks');

const { and, iff, hasSetting, hasParams, isOneOf } = require('@checkers');
const { disallow } = require('@utils');

module.exports = (extraHooks) => {
    const defaultHook = {
        before: {
            all: [
                authorized.before,
                parameterize_query.before,
                apply_setting.before,
                iff(
                    and(hasParams('action'), hasSetting('actions')),
                    actions.before,
                ),
                iff(
                    and(hasParams('loadable'), hasSetting('loadable')),
                    load.before
                ),
                iff(
                    and(hasSetting('instance_limit', true), ({ method }) => isOneOf(method, 'create', 'remove', 'patch')),
                    instance_limit.before
                ),
            ],
            create: [
                iff(
                    hasSetting('apply_id', true),
                    apply_id.beforeCreate
                ),
                iff(
                    hasSetting('image_crud'),
                    image_crud.beforeCreate,
                ),
            ],
            find: [
                iff(
                    hasSetting('access_query', true),
                    access_query.beforeFind,
                ),
            ],
            get: [
                iff(
                    hasSetting('access_query', true),
                    access_query.beforeGet,
                ),
            ],
            update: [
                disallow(),
            ],
            patch: [
                iff(
                    hasSetting('image_crud'),
                    image_crud.beforeUpdate,
                ),
                iff(
                    and(hasParams('action'), hasSetting('actions')),
                    actions.runAction
                ),
            ],
            remove: [
    
            ],
        },
        after: {
            all: [
                iff(
                    and(hasParams('loadable'), hasSetting('loadable')),
                    load.after
                )
            ],
            create: [
                (context) => {
                    if (context.result.merchantId) {
                        context.service.emit('modified', {
                            id: context.result.merchantId || context.result.relate.merchant,
                            target: 'MERCHANT'
                        });
                    }
                }
            ],
            find: [
                iff(
                    hasSetting('image_crud'),
                    image_crud.afterFind,
                ),
            ],
            get: [
                iff(
                    hasSetting('image_crud'),
                    image_crud.afterGet,
                ),
            ],
            patch: [
                iff(
                    hasSetting('image_crud'),
                    image_crud.beforeUpdate,
                ),
                (context) => {
                    if (context.result.merchantId) {
                        context.service.emit('modified', {
                            id: context.result.merchantId || context.result.relate.merchant,
                            target: 'MERCHANT'
                        });
                    }
                }
            ],
            remove: [
                iff(
                    hasSetting('image_crud'),
                    image_crud.afterRemove,
                ),
                (context) => {
                    if (context.result.merchantId) {
                        context.service.emit('modified', {
                            id: context.result.merchantId || context.result.relate.merchant,
                            target: 'MERCHANT'
                        });
                    }
                }
            ],
        },
        error: {
            all: [
    
            ],
            create: [
                iff(
                    hasSetting('image_crud'),
                    image_crud.errorCreate,
                ),
            ],
            find: [
    
            ],
            get: [
    
            ],
            patch: [
                iff(
                    hasSetting('image_crud'),
                    image_crud.errorUpdate,
                ),
            ],
            remove: [
    
            ],
        }
    };

    if (extraHooks) {
        extraHooks(defaultHook);
    }
    return defaultHook;
};