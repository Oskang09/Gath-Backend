/*
    FeatherHook - Authorized

    * Default feathersjs/authentication middleware hooks

    - Required condition
    * hasSetting(context, 'authorized')
    
    - Definition
    {
        authorized: true,
    }
 */

const Authenticated     = require('@feathersjs/authentication/lib/hooks/authenticate');
const authConfig        = require('@config/auth');

module.exports = {
    before: Authenticated(authConfig.availableStrategy),
};