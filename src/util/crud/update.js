module.exports = (
    { url, schema, images, preValidation }, model
) => {
    return {
        method: 'PUT',
        url, schema, preValidation,
        handler: async function (req, reply) {
            const oldImages = [];
            const uploadedImages = [];
            try {
                const instance = await model.findByPk(req.params.id);
                if (Array.isArray(images)) {
                    for (const image of images) {
                        const imageId = await this.cdn.upload(req.body[image]);
                        req.body[image] = imageId;
                        uploadedImages.push(imageId);
                        oldImages.push(instance[image]);
                    }
                }
                const updated = await instance.update(req.body);
                for (const oldImage of oldImages) {
                    await this.cdn.remove(oldImage);
                }
                return reply.json(updated);
            } catch (error) {
                for (const uploadedImage of uploadedImages) {
                    await this.cdn.remove(uploadedImage);
                }
                return reply.error(error);
            }
        }
    };
};