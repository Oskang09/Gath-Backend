/*
    FeatherHook - Apply ID

    * Apply id to achieve one to many relation automatically ( most of the time for merchantId )

    - Required condition
    * hasAccount(context)
    * hasSetting(context, 'apply_id', true)
    
    - Definition
    {
        apply_id: {
            MERCHANT: [async] context => {

            }
        }
    }
 */

const { getSetting } = require('@getters');

module.exports = {
    beforeCreate: async (context) => {
        const options = getSetting(context, `apply_id`, true);
        await options(context);
        return context;
    }
};
