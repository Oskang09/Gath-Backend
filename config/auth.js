const LocalVerifier = require('@feathersjs/authentication-local/lib/verifier');
const JWTVerifier = require('@feathersjs/authentication-jwt/lib/verifier');
const { isOneOf } = require('@checkers');

const userPayload = async (app, options, id, next) => {
    const accountService = app.service('account');
    const merchantService = app.service('merchant');
    const storeService = app.service('store');

    const account = await accountService.get(id);
    if (account) {
        delete account.password;
        try {
            const newPayload = { [`${options.entity}Id`]: id };
            if (isOneOf(account.type, 'MERCHANT', 'WAITER', 'KITCHEN', 'STORE') ) {
                const merchant = await merchantService.get(account.relate.merchant, { loadable: [ 'stores' ]});
                delete merchant.license;

                if (account.type === 'MERCHANT') {
                    return next(null, { account, merchant }, newPayload);
                }

                const store = await storeService.get(account.relate.store);
                return next(null, { account, merchant, store }, newPayload);
            } else if (account.type === "ADMIN") {
                return next(null, { account }, newPayload);
            }
        } catch (error) {
            return next(error);
        }
    }
    return next(Error(`auth.invalid_account`));
};

module.exports = {
    availableStrategy: ['jwt', 'local'],
    default: {
        secret: 'oH1$mboDCh?l+7De;zJbEnb#19_-f{',
        service: 'account',
        jwt: {
            header: { typ: 'access' },
            audience: 'http://devapi.ordopos.com',
            subject: 'ordo-access-token',
            issuer: 'ordo',
            algorithm: 'HS256',
            expiresIn: '1d'
        }
    },
    jwt: {
        service: 'account',
        Verifier: class extends JWTVerifier {

            verify(req, payload, next) {
                const id = payload[`${this.options.entity}Id`];
                if (id === undefined) {
                    return next(Error('auth.bad_jwt_token'));
                }
                return userPayload(this.app, this.options, id, next);
            }
        },
    },
    local: {
        service: 'account',
        usernameField: 'username',
        passwordField: 'password',
        entityUsernameField: 'username',
        entityPasswordField: 'password',
        Verifier: class extends LocalVerifier {
            verify(req, username, password, next) {
                const id = this.service.id;
                if (id === null || id === undefined) {
                    return next(Error(`auth.user_not_exists`));
                }

                const usernameField = this.options.entityUsernameField || this.options.usernameField;
                const params = {
                    'query': {
                        [usernameField]: username,
                        '$limit': 1
                    }
                };

                this.app.service('account').find(params)
                    .then(response => this._normalizeResult(response))
                    .then(account => this._comparePassword(account, password))
                    .then(account => {
                        delete account.password;

                        const id = account[this.service.id];
                        return userPayload(this.app, this.options, id, next);
                    })
                    .catch(
                        (error) => next(error)
                    );
            }
        }
    }
};