require('module-alias/register');
const glob        = require('glob');

const app         = require('@register/feathersjs');
const sequelize   = require('@register/sequelize');
const validator   = require('@register/validator');
const firebase    = require('@register/firebase');
const mailer      = require('@register/mailer');

app.set('services', {
    sequelize,
    validator: validator.instance,
    schema: validator.schema,
    bucket: firebase.bucket,
    mailer,
});

app.hooks({
    error: (context) => {
        console.log(context.error);
    }
});

sequelize.authenticate().then(
    () => {
        for (const module of glob.sync('./services/**/*.js', { cwd: __dirname })) {
            const service = require(module);
            service(app); 
        }
        
        app.listen(process.env.PORT || 3000).on('listening', () => 
            console.log(`Feathers server listening on localhost:${process.env.PORT || 3000}`)
        );
    },
    (error) => {
        console.log(`Database connection rejected due to : ` + error);
        process.exit(1);
    }
);