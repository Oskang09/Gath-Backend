module.exports = {
    availableStrategy: [ 'custom', 'jwt' ],
    default: {
        secret: 'oH1$mboDCh?l+7De;zJbEnb#19_-f{',
        service: 'user',
        jwt: {
            header: { typ: 'access' },
            audience: 'http://devapi.gath.com',
            subject: 'gath-token',
            issuer: 'gath',
            algorithm: 'HS256',
            expiresIn: '1d'
        }
    },
    jwt: {
        service: 'user',
    },
    async custom(req, next) {
        if (!req.body.token) {
            return next({
                ok: false,
                err: `auth.missing_token`
            });
        }
        const userService = this.app.service('user');
        const { auth } = this.app.get('services').firebase;
        try {
            const firebaseUser = await auth.verifyIdToken(req.body.token);
            const user = await userService.find({
                uid: firebaseUser.uid,
                $limit: 1,
                paginate: false,
            });
            if (user && user.length === 1) {
                return next(null, { user: user[0], firebaseUser }, { userId: user.id });
            } else {
                return next({
                    ok: false,
                    err: `auth.invalid_user`
                });
            }
        } catch (error) {
            return next({
                ok: false,
                err: `auth.invalid_token`
            });
        }
    }
};