const Sequelize = require('sequelize');

module.exports = {
    path: {
        api: '/users/review/:id',
        internal: 'userReview',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { review, user } = this.sequelizeModels;
        const userId = params.id === 'me' ? ctx.state.user.id : params.id;
        if (params.full) {
            return review.findAll({
                where: {
                    toUserId: userId,
                },
                include: [
                    { model: user, as: 'fromUser' },
                    { model: user, as: 'toUser' },
                ]
            });
        }
        
        const count = await this.sequelize.query(
            `
                SELECT
                    COUNT(*) FILTER (WHERE badge != 'empty-badge') AS "numsOfBadge",
                    COUNT(*) AS "numsOfComment"
                FROM
                    "reviews"
                WHERE
                    "toUserId" = ${userId}
            `,
            {
                raw: true,
                type: Sequelize.QueryTypes.SELECT,
            }
        );
        return count[0];
    },
};