module.exports = {
    path: {
        api: '/events/:event',
        internal: 'eventAction',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event, event_user, notification, user } = this.sequelizeModels;
        const userId = ctx.state.user.id;
        const eventRes = await event.findByPk(params.event);
        const eventUser = await event_user.findOne({
            where: {
                eventId: params.event,
                userId,
            },
        });

        return this.tsql(
            async (transaction) => {
                switch (params.action) {
                    case 'REQUEST':
                        if (eventUser) throw "ALREADY_JOIN_EVENT";
                        await event_user.create({ eventId: params.event, userId, status: 'REQUESTING' }, { transaction });
                        break;
                    case 'REJECT':
                    case 'KICK':
                        if (eventUser.status !== 'OWNER') throw "NOT_EVENT_OWNER";
                        if (!params.user)                 throw "MISSING_USER_PARAM";
                        const rejectTarget = await event_user.findOne({
                            where: {
                                eventId: params.event,
                                userId: params.user,
                            },
                            include: [ user ]
                        });
                        if (rejectTarget) {
                            await rejectTarget.destroy({ transaction });
                            this.pushNotification({
                                target: rejectTarget.user.device_token,
                                data: {
                                    action: 'VIEW_EVENT',
                                    event: params.event.toString(),
                                },
                                title: `Event Information`,
                                body: params.action === 'REJECT' ? 
                                    `Your request to event ${eventRes.name} have been rejected` :
                                    `You have been kicked from event ${eventRes.name}`,
                            });
                            await notification.create({
                                action: 'VIEW_EVENT',
                                eventId: params.event,
                                about: params.action === 'REJECT' ? 
                                    `Your request to event ${eventRes.name} have been rejected` :
                                    `You have been kicked from event ${eventRes.name}`,
                                userId: params.user,
                            }, { transaction });
                        }
                        break;
                    case 'ACCEPT':
                        if (eventUser.status !== 'OWNER') throw "NOT_EVENT_OWNER";
                        if (!params.user)                 throw "MISSING_USER_PARAM";
                        const acceptTarget = await event_user.findOne({
                            include: [ user ],
                            where: {
                                eventId: params.event,
                                userId: params.user,
                            },
                        });
                        if (acceptTarget) {
                            await acceptTarget.update({ status: 'MEMBER' }, { transaction });
                            this.pushNotification({
                                target: acceptTarget.user.device_token,
                                data: {
                                    action: 'VIEW_EVENT',
                                    event: params.event.toString(),
                                },
                                title: `Event Information`,
                                body: `Your request to event ${eventRes.name} have been accepted.`
                            });
                            await notification.create({
                                action: 'VIEW_EVENT',
                                eventId: params.event,
                                about: `Your request to event ${eventRes.name} have been accepted.`,
                                userId: params.user,
                            }, { transaction });
                        }
                        break;
                    case 'CHECK_IN':
                        if (!eventUser) throw "HAVENT_JOIN_EVENT";
                        if (eventRes.status === 'END') throw "EVENT_ENDED";
                        await eventUser.update({ status: 'PARTICIPATED' }, { transaction })
                        break;
                    case 'QUIT':
                        if (!eventUser) throw "HAVENT_JOIN_EVENT";
                        if (eventRes.status === 'START') throw "EVENT_STARTED";
                        await eventUser.destroy({ transaction });
                        break;
                    case 'START_EVENT':
                        if (eventUser.status !== 'OWNER') throw "NOT_EVENT_OWNER";
                        await eventRes.update({ status: 'START' }, { transaction });
                        break;
                    case 'END_EVENT':
                        if (eventUser.status !== 'OWNER') throw "NOT_EVENT_OWNER";
                        await eventRes.update({ status: 'END' }, { transaction });
                        const eventUsers = await event_user.findAll({
                            where: {
                                eventId: params.event
                            },
                            select: [ 'userId' ],
                            raw: true
                        });
                        const userIds = eventUsers.map((eventUser) => eventUser.userId);
                        for (const ids of userIds) {
                            await notification.create({
                                action: 'REVIEW',
                                eventId: params.event,
                                about: `Event ${eventRes.name} have ended. You can review other participants.`,
                                userId: ids,
                                read: false,
                            }, { transaction });
                        }
                        break;
                }
        
                return {};
            }
        );
    },
};