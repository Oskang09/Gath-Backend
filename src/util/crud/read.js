module.exports = (
    { url, schema, images }, model
) => {
    return {
        method: 'GET',
        url, schema,
        handler: async function (req, reply) {
            try {
                const instances = await model.findAll({
                    ...req.query,
                    raw: true
                });
                if (Array.isArray(images)) {
                    for (const image of images) {
                        for (const instance of instances) {
                            instance[image] = this.cdn.parse(instance[image]);
                        }
                    }
                }
                return reply.json(instances);
            } catch (error) {
                return reply.error(error);
            }
        }
    };
};