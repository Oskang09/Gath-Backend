module.exports = {
    path: {
        api: '/events/:id',
        internal: 'deleteEvent',
    },
    method: 'DELETE',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event, event_user, user, notification } = this.sequelizeModels;
        const instance = await event.findByPk(params.id);
        if (!instance) {
            throw "MISSING_EVENT";
        }

        const meta = await event_user.findOne({
            where: {
                eventId: instance.id,
                userId: ctx.state.user.id,
            }
        });

        if (meta.status !== 'OWNER') {
            throw "NOT_EVENT_OWNER";
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
                const asyncNotify = [ instance.destroy({ transaction }) ];
                for (const eventUser of eventUsers) {
                    asyncNotify.push(
                        notification.create({
                            action: 'NONE',
                            eventId: params.id,
                            about: `Event ${instance.name} have been deleted.`,
                            userId: eventUser.userId,
                        }, { transaction }),
                        this.pushNotification({
                            target: eventUser.user.device_token,
                            data: {
                                action: 'NONE',
                                event: params.id.toString(),
                            },
                            title: `Event Information`,
                            body: `Event ${instance.name} have been deleted.`
                        })
                    );
                }
        
                return Promise.all(asyncNotify);
            }
        );
    },
};