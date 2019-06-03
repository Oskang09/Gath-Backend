/*
    FeatherHook - AccessQuery

    * Apply some query for limiting access before run query

    - Required condition
    * hasAccount(context)
    * hasSetting(context, 'access_query', true)
    
    - Definition
    {
        access_query: {
            ROLE: [async] context => {

            }
        }
    }
 */

const { getSetting } = require('@getters');

module.exports = {
    beforeFind: async (context) => {
        const options = getSetting(context, `access_query`, true);
        Object.assign(
            context.params,
            await options(context)
        );

        return context;
    },
    beforeGet: async (context) => {
        const options = getSetting(context, `access_query`, true);
        Object.assign(
            context.params,
            await options(context)
        );

        return context;
    },
};