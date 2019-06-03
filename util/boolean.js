const { 
    iff,
    some,
    every,
} = require('feathers-hooks-common');

const { getByDot } = require('@getters');

const hasParams = (options) => (context) => {
    return getByDot(context, `params.${options}`);
};

const hasSetting = (options) => (context) => {
    return getByDot(context, `_setting.${options}`);
};

const isServerRequest = (context) => {
    return !hasProvider(context);
};

const hasProvider = (context) => {
    return context.params.provider;
};

const isProvider = (provider) => (context) => {
    return context.params.provider === provider;
};

const isIncluded = (data, includes) => {
    if (
        data === '*' || 
        data.includes && data.includes(includes)
    ) {
        return true;
    }
    return false;
};

const isOneOf = (data, ...string) => {
    for (const str of string) {
        if (data === str) {
            return true;
        }
    }
    return false;
};

module.exports = {
    hasSetting,
    hasProvider,
    hasParams,
    isProvider,
    isIncluded,
    isOneOf,
    isServerRequest,
    iff,
    or: some,
    and: every,
};