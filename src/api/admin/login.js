module.exports = {
    path: {
        internal: 'adminLogin',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function ({ username, password }, ctx) {
        const { admin } = this.sequelizeModels;
        const instance = await admin.findOne({
            where: {
                username, password
            },
            select: [ 'token' ]
        });
        if (!instance) {
            return "Invalid password";
        }
        ctx.cookies.set('gath-admin', instance.token, { overwrite: true });
        return ctx.redirect('/web/');
    },
};