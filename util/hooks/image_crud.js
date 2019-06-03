/*
    FeatherHook - Image CRUD

    - Required condition
    * hasSetting(context, 'image_crud')
    
    - Definition
    {
        image_crud: [ 'field_name' ]
    }
 */

const { getService, getSetting, getItems } = require('@getters');

const parseImage = (id) => `https://firebasestorage.googleapis.com/v0/b/allder-687d0.appspot.com/o/${id}?alt=media`;
const createImage = async (context) => {
    const options = getSetting(context, 'image_crud');
    const cdn = getService(context, 'cdn');
    for (const image of options) {
        if (context.data[image]) {
            const id = await cdn.create({ base64: context.data[image] });
            context.data[image] = id;
            context._images = { 
                [image]: id 
            };
        }
    }
    return context;
};
const updateImage = async (context) => {
    const options = getSetting(context, 'image_crud');
    const cdn = getService(context, 'cdn');
    const target = await context.service.get(context.id);
    for (const image of options) {
        if (context.data[image]) {
            const after = await cdn.create({ base64: context.data[image] });
            const before = target[image];
            context.data[image] = after;
            context._images = { 
                [image]: { 
                    before, 
                    after 
                } 
            };
        }
    }
    return context;
};
const removeImage = (state) => async (context) => {
    const cdn = getService(context, 'cdn');
    if (context._images) {
        for (const image of Object.keys(context._images)) {
            if (state === 'update_success') {
                await cdn.remove(context._images[image].before);
            } else if (state === 'update_failed') {
                await cdn.remove(context._images[image].after);
            } else if (state === 'remove') {
                await cdn.remove(context.result[image]);
            } else if (state === 'create_failed') {
                await cdn.remove(context._images[image]);
            }
        }
    }
    return context;
};

module.exports = {
    beforeCreate: createImage,
    beforeUpdate: updateImage,
    afterUpdate: removeImage('update_success'),
    afterRemove: removeImage('remove'),
    errorCreate: removeImage('create_failed'),
    errorUpdate: removeImage('update_failed'),
    afterFind: (context) => {
        const options = getSetting(context, 'image_crud');
        for (const data of getItems(context)) {
            for (const image of options) {
                if (data[image]) {
                    data[image] = parseImage(data[image]);
                }
            }
        }
        return context;
    },
    afterGet: (context) => {
        const options = getSetting(context, 'image_crud');
        for (const image of options) {
            if (context.result[image]) {
                context.result[image] = parseImage(context.result[image]);
            }
        }
        return context;
    }
};