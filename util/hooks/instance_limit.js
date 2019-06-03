/*
    FeatherHook - Instance Limit
    - Required condition
    * hasAccount(context)
    * hasSetting(context, 'instance_limit', true)
    
    - Definition
    {
        instance_limit: {
            MERCHANT: [async] context => {

            }
        }
    }
 */
const { getSetting, getMethod } = require('@getters');

module.exports = {
    before: async (context) => {
        const options = getSetting(context, `instance_limit`, true);
        await options(context, getMethod(context));
        return context;
    },
};