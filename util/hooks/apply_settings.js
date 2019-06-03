/*
    FeatherHook - Apply Setting

    * Merge 'model.options' into 'context._setting'

    - Required condition
    * Must be inside model service
 */

const { getObjectByKey } = require('@getters');
module.exports = {
    before: (context) => {
        const model = context.service.getModel();
        context._setting = getObjectByKey(model.options, 'image_crud', 'authorized', 'actions', 'loadable', 'apply_id', 'instance_limit', 'access_query');
        return context;
    }
};