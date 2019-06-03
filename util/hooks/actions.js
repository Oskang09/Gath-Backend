/*
    FeatherHook - Actions

    * Custom actions to achieve associations and other chaining actions.

    - Required condition
    * hasAccount(context)
    * hasParams(context, 'action')
    * hasSetting(context, 'actions', true)
    
    - Definition
    {
        accessible: {
            actions: ['action_name' ] // service method or apply '*' mean all
        },
        actions: {
            action_name: [async] context => {

            }
        }
    }
 */

const { getSetting, getParams } = require('@getters');
const { isIncluded } = require('@checkers');

module.exports = {
    before: async (context) => {
        const options = getSetting(context, `accessible`, true).actions;
        const action = getParams(context, 'action');
        if (!isIncluded(options, action.type)) {
            throw Error(`hooks.action.no_permission`);
        }
        return context;
    },
    runAction: async (context) => {
        const action = getParams(context, 'action');
        if (!action.type) {
            throw Error(`hooks.action.missing_type`);
        }
        const options = getSetting(context, `actions.${action.type}`);
        if (options) {
            await options(context, action);
        }
        return context;
    }
};