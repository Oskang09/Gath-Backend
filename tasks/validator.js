const Glob              = require('glob');
const Validator         = require('fastest-validator');

const validator = new Validator();
const schema = {};

for (const module of Glob.sync('../validator/**/*.js', { cwd: __dirname })) {
    const setting = require(module); 
    const validate = validator.compile(setting.schema);
    schema[setting.name] = validate;
}

module.exports = {
    instance: validator,
    schema
};