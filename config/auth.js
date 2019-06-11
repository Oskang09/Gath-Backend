module.exports = {
    availableStrategy: [ 'custom', 'jwt' ],
    default: {
        secret: 'oH1$mboDCh?l+7De;zJbEnb#19_-f{',
        service: 'firebaseUser',
        jwt: {
            header: { typ: 'access' },
            audience: 'https://api.gath.com',
            subject: 'gath-token',
            issuer: 'gath',
            algorithm: 'HS256',
            expiresIn: '1d'
        }
    },
    jwt: {
        service: 'firebaseUser',
    },
    async custom(req, next) {
        if (!req.body.token) {
            return next({
                ok: false,
                err: `auth.missing_token`
            });
        }
        const { auth } = this.app.get('services').firebase;
        try {
            const firebaseUser = await auth.verifyIdToken(req.body.token);
            if (firebaseUser) {
                return next(null, { user: firebaseUser.uid }, { userId: firebaseUser.uid });
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