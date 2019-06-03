const Feathers          = require('@feathersjs/feathers');
const SocketIO          = require('@feathersjs/socketio');
const Express           = require('@feathersjs/express');
const Authentication    = require('@feathersjs/authentication');
const LocalAuth         = require('@feathersjs/authentication-local');
const JWTAuth           = require('@feathersjs/authentication-jwt');
const authConfig        = require('@config/auth');
const i18nConfig        = require('@config/i18n');

const app = Express(Feathers());
app.configure(SocketIO());

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

app.hooks({
    error: (context) => {
        if (context.error instanceof Error) {
            const error = i18nConfig[context.error.message];
            if (error) {
                context.error = error
            } else {
                context.error = {
                    msg: 'Unconfigured Error ' + context.error.message,
                    name: 'Required Configure',
                    code: 400,
                    stack: context.error
                };
            }
        } else {
            context.error = {
                msg: 'Unhandled error occurs',
                name: 'Unhandled Error',
                code: 400,
                stack: context.error
            };
        }
        return context;
    },
});

app.configure(Authentication(authConfig.default));
app.configure(JWTAuth(authConfig.jwt));
app.configure(LocalAuth(authConfig.local));

app.service('authentication').hooks({
    before: {
        create: [ Authentication.hooks.authenticate(authConfig.availableStrategy) ],
        remove: [ Authentication.hooks.authenticate('jwt') ]
    },
    after: {
        create: [
            async (context) => {
                context.result = {
                    ...context.result,
                    user: context.params.user,
                };
            }
        ]
    }
});

// app.on('login', (payload, { connection }) => {

// });

// app.on('logout',
//     (payload, { connection }) => {

//     }
// );

// app.publish(() => app.channel('authenticated'));

module.exports = app;