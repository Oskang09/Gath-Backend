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
        const eventOwner = (await event_user.findOne({
            where: {
                eventId: params.event,
                status: 'OWNER',
            },
            include: [ user ]
        })).user;
        const eventUser = await event_user.findOne({
            where: {
                eventId: params.event,
                userId,
            },
        });
        let eventTarget = null;
        if (params.user) {
            eventTarget = await event_user.findOne({
                include: [ user ],
                where: {
                    eventId: params.event,
                    userId: params.user,
                },
            });
        }

        return this.tsql(
            async (transaction) => {
                if (params.action === 'REJECT' || params.action === 'KICK') {
                    if (eventUser.status !== 'OWNER') throw "NOT_EVENT_OWNER";
                    if (!params.user)                 throw "MISSING_USER_PARAM";
                    if (!eventTarget)                 throw "NOT_IN_EVENT";
                    await Promise.all([
                        eventTarget.destroy({ transaction }),
                        this.pushNotification({
                            target: eventTarget.user.device_token,
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
                    ]);
                }
                else if (params.action === 'REQUEST') {
                    await event_user.create({ eventId: params.event, userId, status: 'REQUESTING' }, { transaction });
                    await Promise.all([
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
                            userId: eventOwner.id,
                        }, { transaction })
                    ]);
                }
                else if (params.action === 'ACCEPT') {
                    if (eventUser.status !== 'OWNER') throw "NOT_EVENT_OWNER";
                    if (!params.user)                 throw "MISSING_USER_PARAM";
                    if (!eventTarget)                 throw "NOT_IN_EVENT";
                    await Promise.all([
                        eventTarget.update({ status: 'MEMBER' }, { transaction }),
                        this.pushNotification({
                            target: eventTarget.user.device_token,
                            data: {
                                action: 'VIEW_EVENT',
                                event: params.event.toString(),
                            },
                            title: `Event Information`,
                            body: `Your request to event ${eventRes.name} have been accepted.`
                        }),
                        notification.create({
                            action: 'VIEW_EVENT',
                            eventId: params.event,
                            about: `Your request to event ${eventRes.name} have been accepted.`,
                            userId: eventTarget.user.id,
                        }, { transaction }),
                    ]);
                }
                else if (params.action === "CHECK_IN") {
                    if (!eventUser) throw "HAVENT_JOIN_EVENT";
                    if (eventRes.status === 'END') throw "EVENT_ENDED";
                    await eventUser.update({ status: 'PARTICIPATED' }, { transaction })
                }
                else if (params.action === "QUIT") {
                    if (!eventUser) throw "HAVENT_JOIN_EVENT";
                    if (eventRes.status === 'START') throw "EVENT_STARTED";
                    await Promise.all([
                        eventUser.destroy({ transaction }),
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
                            userId: eventOwner.id,
                        }, { transaction })
                    ]);
                }
                else if (params.action === "START_EVENT" || params.action === "END_EVENT") {
                    if (eventUser.status !== 'OWNER') throw "NOT_EVENT_OWNER";
                    const isStart = params.action === "START_EVENT";
                    const eventUsers = await event_user.findAll({
                        where: {
                            eventId: params.event
                        },
                        include: [ user ],
                        select: [ 'userId' ],
                    });
                    const asyncNotify = [
                        eventRes.update({ status: isStart ? 'START' : 'END' }, { transaction })
                    ];
                    for (const eventUser of eventUsers) {
                        asyncNotify.push(
                            notification.create({
                                action: isStart ? 'VIEW_EVENT' : 'REVIEW',
                                eventId: params.event,
                                about: isStart ? 
                                    `Event ${eventRes.name} have started. You can check in before event end.` :
                                    `Event ${eventRes.name} have ended. You can review other participants.`,
                                userId: eventUser.userId,
                            }, { transaction }),
                            this.pushNotification({
                                target: eventUser.user.device_token,
                                data: {
                                    action: isStart ? 'VIEW_EVENT' : 'REVIEW',
                                    event: params.event.toString(),
                                },
                                title: `Event Information`,
                                body: isStart ?
                                    `Event ${eventRes.name} have started. You can check in before event end.` :
                                    `Event ${eventRes.name} have ended. You can review other participants.`
                            })
                        );
                    }
                    await Promise.all(asyncNotify);
                }
                return {};
            }
        );
    },
};