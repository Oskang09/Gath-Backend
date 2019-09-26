const Op = require('sequelize').Op;

module.exports = {
    path: {
        api: '/users/event/me',
        internal: 'userEvents',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event, event_user } = this.sequelizeModels;
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;
        const { count, rows } = await event_user.findAndCountAll({
            limit, offset,
            where: { userId: ctx.state.user.id },
            include: [{ 
                model: event,
                where: {
                    status: {
                        [Op.not]: 'END'
                    },
                }
            }],
        });
        
        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};