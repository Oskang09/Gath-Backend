module.exports = {
    name: 'verifyToken',
    handler: ({ mustHaveToken = true }) => {
        return async function(ctx) {
            const token = ctx.get('gath-token');
            if (token) {
                try {
                    ctx.state.firebaseUser = await this.auth.verifyIdToken(token);
                    ctx.state.user = await this.sequelizeModels.user.findOne({ 
                        where: { uid: token },
                        limit: 1,
                        raw: true,
                    });
                } catch (error) {
                    try {
                        ctx.state.user = await this.sequelizeModels.admin.findOne({ 
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
        };
    }
}