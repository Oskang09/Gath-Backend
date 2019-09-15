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
            const running = await event_user.findOne({
                where: {
                    userId: ctx.state.user.id,
                },
                include: [ event ],
            });
            if (!running) {
                throw "NO_EVENT_RUNNING";
            }
            return running.event;
        }
        else if (params.id === 'me') {
            const limit = Number(params.limit) || 1;
            const page = Number(params.page) || 1;
            const offset = ( page - 1 ) * limit;

            const { count, rows } = await event_user.findAndCountAll({
                limit, offset,
                where: {
                    userId: ctx.state.user.id,
                },
                include: [{ 
                    model: event,
                    where: {
                        status: {
                            [Op.not]: 'END'
                        }
                    }
                }],
            });
            return {
                pagination: { page, count, limit },
                result: rows,
            };
        } else if (Number(params.id) !== Number.NaN) {
            const result = await event.findByPk(params.id);
            return result;
        }
    },
};