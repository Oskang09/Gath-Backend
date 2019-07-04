module.exports = (
    { url, schema, images, preValidation }, model
) => {
    return {
        method: 'GET',
        url, schema, preValidation,
        handler: async function (req, reply) {
            try {
                const instance = await model.findByPk(req.params.id, { raw: true });
                if (Array.isArray(images)) {
                    for (const image of images) {
                        instance[image] = this.cdn.parse(instance[image]);
                    }
                }
                return reply.json(instance);
            } catch (error) {
                return reply.error(error);
            }
        }
    };
};