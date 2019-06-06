const aclq             = require('./hooks/access_query');
const actions          = require('./hooks/actions');
const apply_id         = require('./hooks/apply_id');
const apply_setting    = require('./hooks/apply_settings');
const authorized       = require('./hooks/authorized');

const load             = require('./hooks/loadable_attribute');
const image_crud       = require('./hooks/image_crud');
const instance_limit   = require('./hooks/instance_limit');
const para_query       = require('./hooks/parameterize_query');


module.exports = {
    access_query: aclq,
    actions,
    apply_id,
    apply_setting,
    authorized,
    load,
    image_crud,
    instance_limit,
    parameterize_query: para_query,
};