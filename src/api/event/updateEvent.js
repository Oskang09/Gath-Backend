module.exports = {
    path: {
        api: '/events/:id',
        internal: 'updateEvent',
    },
    method: 'PUT',
    before: [ 'verifyToken' ],
    handler: async function(params) {
        const { event, event_user, user, notification } = this.sequelizeModels;
        const instance = await event.findByPk(params.id);
        if (!instance) {
            throw "MISSING_INSTANCE";
        }
        
        const body = {
            shop: params[2].shop,
            location: params[2].location,
            desc: params[1],
            type: params[0].type,
            name: params[0].name,
            start_time: params[0].start,
        };

        if (params[0].banner) {
            if (instance.image) {
                this.cdn.remove(instance.image);
            }
            Object.assign(body, { image: await this.cdn.upload(params[0].banner) });
        }

        const eventUsers = await event_user.findAll({
            where: {
                eventId: params.id
            },
            include: [ user ],
            select: [ 'userId' ],
        });

        return this.tsql(
            (transaction) => {
                const asyncNotify = [ instance.update(body, { transaction }) ];
                for (const eventUser of eventUsers) {
                    asyncNotify.push(
                        notification.create({
                            action: 'VIEW_EVENT',
                            eventId: params.id,
                            about: `Event owner of ${instance.name} have updated event information.`,
                            userId: eventUser.userId,
                        }, { transaction }),
                        this.pushNotification({
                            target: eventUser.user.device_token,
                            data: {
                                action: 'VIEW_EVENT',
                                event: params.id.toString(),
                            },
                            title: `Event Information`,
                            body: `Event owner of ${instance.name} have updated event information.`
                        })
                    );
                }
                return Promise.all(asyncNotify);
            }
        );
    },
};