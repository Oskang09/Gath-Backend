const Koa         = require('koa');
const Router      = require('koa-router');
const Helmet      = require('koa-helmet');
const BodyParser  = require('koa-bodyparser');
const ReactEngine = require('koa-views');

const RouteAPI    = require('./plugin/route-api');
const Response    = require('./plugin/response-handler');
const Helper      = require('./plugin/helper');
const Firebase    = require('./plugin/firebase');
const Sequelize   = require('./plugin/sequelize');
const ReactView   = require('./plugin/react-view');

const setting     = require('./setting');

const globalScope = {
    api: {},
    helpers: {},
    auth: null,
    bucket: null,
    cdn: null,
    sequelize: null,
    sequelizeModel: null,
};

const app = new Koa();
const router = new Router();
const webRouter = new Router();

Firebase(setting.firebase, globalScope);
Sequelize(setting.sequelize, globalScope);
RouteAPI(router, globalScope);
Helper(globalScope);
ReactView(webRouter, globalScope);

app.use(ReactEngine(__dirname + "/src/views", { extension: 'react' }))
    .use(Response(setting.messages, globalScope))
    .use(Helmet(setting.helmet))
    .use(BodyParser(setting.bodyparser))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(webRouter.routes())
    .use(webRouter.allowedMethods())
    .listen(1234, () => console.log(`PORT : ${1234}`));