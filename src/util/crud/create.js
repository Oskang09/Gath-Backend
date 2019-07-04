module.exports = (
    { url, schema, images, middleware }, model
) => {
    return {
        method: 'POST',
        url,
        schema,
        preValidation: middleware,
        handler: async function (req, reply) {
            if (Array.isArray(images)) {
                for (const image of images) {
                    req.body[image] = await this.cdn.upload(req.body[image]);
                }
            }

            try {
                const instance = await model.create(req.body, { raw: true });
                if (Array.isArray(images)) {
                    for (const image of images) {
                        instance[image] = this.cdn.parse(image);
                    }
                }
                return reply.json(instance);
            } catch (error) {
                if (Array.isArray(images)) {
                    for (const image of images) {
                        await this.cdn.remove(req.body[image]);
                    }
                }
                return reply.error(error);
            }
        }
    };
};