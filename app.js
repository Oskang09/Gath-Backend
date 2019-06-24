require('module-alias/register');

const Fastify    = require('fastify');
const Helmet     = require('fastify-helmet');
const Cors       = require('fastify-cors');
const Firebase   = require('@plugin/firebase');
const Gmaps      = require('@plugin/gmaps');
const Mailer     = require('@plugin/mailer');
const Sequelize  = require('@plugin/sequelize');
const RouteAPI   = require('@plugin/route-api');
const Helper     = require('@plugin/helpers');
const config     = require('@config/setting');

const fastify = Fastify();

fastify.decorateReply('json', function(result, message, status = 200) {
    this.type('application/json');
    this.code(status);
    this.send({
        ok: true,
        message,
        result,
    });
});

fastify.decorateReply('error', function(message, error, status = 400) {
    this.type('application/json');
    this.code(status);
    this.send({
        ok: false,
        message,
        error,
    });
});

fastify
    .register(Helmet, { hidePoweredBy: { setTo: 'Gath 0.0.1' } })
    .register(Cors, { origin: true })
    .register(Firebase, config.firebase)
    .register(Gmaps, config.gmaps)
    .register(Mailer, config.gmail)
    .register(Sequelize, config.sequelize)
    .register(RouteAPI)
    .register(Helper)
    .listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(fastify.printRoutes());
        console.info(`[Fastify] Server listening on %o:%o`, fastify.server.address().address, fastify.server.address().port);
    });
