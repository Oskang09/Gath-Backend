const Koa         = require('koa');
const Router      = require('koa-router');
const Helmet      = require('koa-helmet');
const ReactEngine = require('koa-views');
const Static      = require('koa-static');
const BodyParser  = require('koa-bodyparser');
const Formidable  = require('koa2-formidable');

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
    sequelizeModels: null,
};

const app = new Koa();
const router = new Router();
const webRouter = new Router();

Firebase(setting.firebase, globalScope);
Sequelize(setting.sequelize, globalScope);
RouteAPI(router, globalScope);
ReactView(webRouter, globalScope);
Helper(globalScope);

app.use(Static('assets/'))
    .use(Formidable())
    .use(BodyParser(setting.bodyparser))
    .use(ReactEngine(__dirname + "/src/views", { extension: 'react' }))
    .use(Response(setting.messages, globalScope))
    .use(Helmet(setting.helmet))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(webRouter.routes())
    .use(webRouter.allowedMethods())
    .listen(3000, () => console.log(`PORT : ${3000}`));