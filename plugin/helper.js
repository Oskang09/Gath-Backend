const Glob        = require('glob');

module.exports = function (globalScope) {
    for (const helper of Glob.sync('/src/helper/**/*.js', { cwd: __dirname })) {
        const module = require(helper);
        globalScope.helpers[module.name] = module.handler;
    }
};