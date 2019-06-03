module.exports = {
    'auth.invalid_account': {
        msg: `Account has invalid setup.`,
        name: 'invalid/account',
        code: 401
    },
    'auth.bad_jwt_token': {
        msg: 'Expired or bad jwt token.',
        name: 'invalid/jwt_token',
        code: 401
    },
    'hooks.accessible.no_permission': {
        msg: 'No permission to access action.',
        name: 'unauthorized/no_permission',
        code: 401
    }
};