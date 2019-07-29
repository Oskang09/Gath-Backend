module.exports = {
    name: 'verifyToken',
    handler: function ({ mustHaveToken = true }) {
        const { sequelizeModels, auth } = this;
        return async function(ctx, next) {
            const token = ctx.get('gath-token');
            const { user, admin } = sequelizeModels;
            if (token) {
                try {
                    ctx.state.firebaseUser = await auth.verifyIdToken(token);
                    ctx.state.user = await user.findOne({ 
                        where: { uid: ctx.state.firebaseUser.uid },
                        limit: 1,
                        raw: true,
                    });
                } catch (error) {
                    try {
                        ctx.state.user = await admin.findOne({ 
                            where: { token },
                            limit: 1,
                            raw: true,
                        });
                        ctx.state.isAdmin = true;
                    } catch (error) {
                        ctx.state.user = null;
                    }
                }
            }
            
            if (!ctx.state.firebaseUser && mustHaveToken) {
                throw "MISSING_HEADER_TOKEN";
            }
            return next();
        };
    }
}