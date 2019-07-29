module.exports = {
    name: 'parseImage',
    handler: ({ fields }) => {
        return async function(ctx, next) {
            if (!ctx.body) {
                return next();
            }

            for (const field of fields) {
                if (ctx.body[field]) {
                    ctx.body[field] = this.cdn.parse(ctx.body[field]);
                }
            }
            return next();
        };
    }
}