module.exports = (
    { url, schema, images, preValidation }, model
) => {
    return {
        method: 'DELETE',
        url, schema, preValidation,
        handler: async function (req, reply) {
            try {
                const instance = await model.destroy({
                    where: {
                        [model.primaryKeyAttribute]: req.params.id
                    }
                });

                if (Array.isArray(images)) {
                    for (const image of images) {
                        await this.cdn.remove(instance[image]);
                    }
                }
                return reply.json(instance);
            } catch (error) {
                return reply.error(error);
            }
        }
    };
};