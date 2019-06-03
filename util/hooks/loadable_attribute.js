/*
    FeatherHook - Eager Loading Attributes

    * Eager loading attributes 

    - Required condition
    * hasAccount(context)
    * hasParams(context, 'ela')
    * hasSetting(context, 'ela')
    
    - Definition
    {
        accessible: {
            MERCHANT: {
                ela: ['name']
            }
        },
        ela: {
            before: (CONTEXT) => {
                // loader setup
            },
            joins: {
                // fields 
            }
        }
    }
 */

const { getSetting, getParams } = require('@getters');
const { intersectionArray, createObjectFromArray } = require('@utils');
const { fastJoin } = require('feathers-hooks-common');

module.exports = {
    before: async (context) => {
        const options = getSetting(context, `accessible`, true).loadable;
        const loadable = getParams(context, 'loadable');
        if (options !== '*') {
            context.params.loadable = intersectionArray(loadable, options);
        }
        return context;
    },
    after: async (context) => {
        const loadable = getParams(context, 'loadable');
        const options = getSetting(context, `loadable`);
        if (loadable && loadable.length > 0) {
            return fastJoin(options, createObjectFromArray(loadable, true))(context);
        }
        return context;
    }
};