module.exports = {
    path: {
        api: '/posts',
        internal: 'getPost',
    },
    method: 'GET',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const limit = Number(params.limit) || 1;
        const page = Number(params.page) || 1;
        const offset = ( page - 1 ) * limit;
        const where = {};
        
        if (params.type) {
            where.type = params.type.includes(',') ? 
                params.type.split(',') :
                params.type;
        }

        const { post, shop } = this.sequelizeModels;
        const { count, rows } = await post.findAndCountAll({
            include: [ shop ],
            order:[
                [ 'createdAt', 'DESC ']
            ],
            limit, offset, where
        });

        return {
            pagination: { page, count, limit },
            result: rows,
        };
    },
};