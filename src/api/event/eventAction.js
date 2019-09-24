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
                        const eventOwner = await user.findByPk(eventRes.organizerId);
                        await Promise.all(
                            this.pushNotification({
                                target: eventOwner.device_token,
                                data: {
                                    action: 'VIEW_EVENT',
                                    event: params.event.toString(),
                                },
                                title: `Event Information`,
                                body: `${ctx.state.user.name} has request to join your event.`,
                            }),
                            notification.create({
                                action: 'VIEW_EVENT',
                                eventId: params.event,
                                about: `${ctx.state.user.name} has request to join your event.`,
                                userId: event_user.id,
                            }, { transaction })
                        );
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
                            await Promise.all(
                                rejectTarget.destroy({ transaction }),
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
                                }),
                                notification.create({
                                    action: 'VIEW_EVENT',
                                    eventId: params.event,
                                    about: params.action === 'REJECT' ? 
                                        `Your request to event ${eventRes.name} have been rejected` :
                                        `You have been kicked from event ${eventRes.name}`,
                                    userId: params.user,
                                }, { transaction }),
                            );
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
                            await Promise.all(
                                acceptTarget.update({ status: 'MEMBER' }, { transaction }),
                                this.pushNotification({
                                    target: acceptTarget.user.device_token,
                                    data: {
                                        action: 'VIEW_EVENT',
                                        event: params.event.toString(),
                                    },
                                    title: `Event Information`,
                                    body: `Your request to event ${eventRes.name} have been accepted.`
                                }),
                                await notification.create({
                                    action: 'VIEW_EVENT',
                                    eventId: params.event,
                                    about: `Your request to event ${eventRes.name} have been accepted.`,
                                    userId: params.user,
                                }, { transaction }),
                            );
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
                        const eventOwner = await user.findByPk(eventRes.organizerId);
                        await Promise.all(
                            this.pushNotification({
                                target: eventOwner.device_token,
                                data: {
                                    action: 'VIEW_EVENT',
                                    event: params.event.toString(),
                                },
                                title: `Event Information`,
                                body: `${ctx.state.user.name} has quit from your event.`,
                            }),
                            notification.create({
                                action: 'VIEW_EVENT',
                                eventId: params.event,
                                about: `${ctx.state.user.name} has quit from your event.`,
                                userId: event_user.id,
                            }, { transaction })
                        );
                        await eventUser.destroy({ transaction });
                        break;
                    case 'START_EVENT':
                        if (eventUser.status !== 'OWNER') throw "NOT_EVENT_OWNER";
                        await eventRes.update({ status: 'START' }, { transaction });
                        const eventUsers = await event_user.findAll({
                            where: {
                                eventId: params.event
                            },
                            include: [ user ],
                            select: [ 'userId' ],
                            raw: true
                        });
                        const asyncNotify = [];
                        for (const eventUser of eventUsers) {
                            asyncNotify.push(
                                notification.create({
                                    action: 'VIEW_EVENT',
                                    eventId: params.event,
                                    about: `Event ${eventRes.name} have started. You can check in before event end.`,
                                    userId: eventUser.userId,
                                    read: false,
                                }, { transaction }),
                                this.pushNotification({
                                    target: eventUser.user.device_token,
                                    data: {
                                        action: 'VIEW_EVENT',
                                        event: params.event.toString(),
                                    },
                                    title: `Event Information`,
                                    body: `Event ${eventRes.name} have started. You can check in before event end.`
                                })
                            );
                        }
                        await Promise.all(asyncNotify);
                        break;
                    case 'END_EVENT':
                        if (eventUser.status !== 'OWNER') throw "NOT_EVENT_OWNER";
                        await eventRes.update({ status: 'END' }, { transaction });
                        const eventUsers = await event_user.findAll({
                            where: {
                                eventId: params.event
                            },
                            include: [ user ],
                            select: [ 'userId' ],
                            raw: true
                        });
                        const asyncNotify = [];
                        for (const eventUser of eventUsers) {
                            asyncNotify.push(
                                notification.create({
                                    action: 'REVIEW',
                                    eventId: params.event,
                                    about: `Event ${eventRes.name} have ended. You can review other participants.`,
                                    userId: eventUser.userId,
                                }, { transaction }),
                                this.pushNotification({
                                    target: eventUser.user.device_token,
                                    data: {
                                        action: 'REVIEW',
                                        event: params.event.toString(),
                                    },
                                    title: `Event Information`,
                                    body: `Event ${eventRes.name} have ended. You can review other participants.`
                                })
                            );
                        }
                        await Promise.all(asyncNotify);
                        break;
                }
        
                return {};
            }
        );
    },
};