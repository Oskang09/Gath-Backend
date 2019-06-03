const { getByDot } = require('@getters');

module.exports = {
    before: (context) => {
        if (context.params.query) {
            const action = getByDot(context, 'params.query.action');
            if (action && action.type) {
                context.params.action = action;
                delete context.params.query.action;
            }
    
            const loadable = getByDot(context, 'params.query.loadable');
            if (loadable) {
                context.params.loadable = loadable;
                delete context.params.query.loadable;
            }
        }
        return context;
    }
};