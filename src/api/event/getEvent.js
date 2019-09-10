const Op = require('sequelize').Op;

module.exports = {
    path: {
        api: '/events/:id',
        internal: 'getEvent',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event, event_user } = this.sequelizeModels;

        if (params.id === 'running') {
            const eventIds = await event_user.findAll({
                where: {
                    userId: ctx.state.user.id,
                },
                select: [ 'eventId' ],
                raw: true,
            });
            const result = await event.findOne({
                where: {
                    id: eventIds.map((event) => event.eventId),
                    status: 'START'
                },
            });
            return result;
        }
        else if (params.id === 'me') {
            const limit = Number(params.limit) || 1;
            const page = Number(params.page) || 1;
            const offset = ( page - 1 ) * limit;

            const { count, rows } = await event_user.findAndCountAll({
                where: {
                    userId: ctx.state.user.id,
                },
                limit, offset,
                select: [ 'eventId' ],
                raw: true,
            });
            const result = await event.findAll({
                where: {
                    id: rows.map((event) => event.eventId),
                    status: {
                        [Op.not]: 'END'
                    }
                },
            });
            return {
                pagination: { page, count, limit },
                result,
            };
        } else if (Number(params.id) !== Number.NaN) {
            const result = await event.findByPk(params.id);
            return result;
        }
    },
};