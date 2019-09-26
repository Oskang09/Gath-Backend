const Op = require('sequelize').Op;

module.exports = {
    path: {
        api: '/events',
        internal: 'findEvents',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;
        const where = {
            status: {
                [Op.not]: 'END'
            }
        };

        if (params.name && params.name.length > 0) {
            where.name = {
                [Op.iRegexp]: params.name.split(' ').join('|')
            };
        }
        if (params.type) {
            where.type = params.type.includes(',') ? 
                params.type.split(',') :
                params.type;;
        }

        const { event, event_user } = this.sequelizeModels;
        const { count, rows } = await event_user.findAndCountAll({
            limit, offset,
            where: {
                [Op.or]: [
                    {
                        userId: {
                            [Op.not]: ctx.state.user.id
                        }
                    },
                    {
                        status: {
                            [Op.not]: 'OWNER'
                        }
                    }
                ]
            },
            include: [{
                model: event, where
            }]
        });
        
        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};