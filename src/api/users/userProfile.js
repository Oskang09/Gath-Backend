const Sequelize = require('sequelize');

module.exports = {
    path: {
        api: '/users/profile/:id',
        internal: 'userProfile',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { user } = this.sequelizeModels;
        const userId = params.id === 'me' ? ctx.state.user.id : params.id;
        const result = await user.findByPk(userId, { raw: true });
        if (params.badge) {
            const badges = await this.sequelize.query(
                `
                    SELECT 
                        COUNT("badge") AS "num",
                        "badge"
                    FROM 
                        "reviews"
                    WHERE 
                        "toUserId" = ${userId}
                    GROUP BY 
                        "badge"
                    ORDER BY
                        "num" DESC
                    LIMIT 4
                `,
                {
                    raw: true,
                    type: Sequelize.QueryTypes.SELECT,
                }
            );
            
            if (badges && badges.length !== 0) {
                const badge = {};
                for (const obj of badges) {
                    badge[obj.badge] = parseInt(obj.num);
                }
                Object.assign(result, { badge });
            }
        }
        return result;
    },
};