module.exports = {
    path: {
        api: '/events/:event',
        internal: 'eventAction',
    },
    method: 'POST',
    before: [ 'verifyToken' ],
    handler: async function(params, ctx) {
        const { event, event_user } = this.sequelizeModels;
        const userId = ctx.state.user.id;
        const eventRes = await event.findByPk(params.event);
        const eventUser = await event_user.findOne({
            where: {
                eventId: params.event,
                userId: userId,
            },
        });

        switch (params.action) {
            case 'REQUEST':
                if (eventUser) throw "ALREADY_JOIN_EVENT";
                await event_user.create({ eventId: params.event, userId, status: 'REQUESTING'})
                break;
            case 'REJECT':
            case 'KICK':
                if (eventRes.organizerId !== userId) throw "NOT_EVENT_OWNER";
                if (!params.user)                    throw "MISSING_USER_PARAM";
                const rejectTarget = await event_user.findOne({
                    where: {
                        eventId: params.event,
                        userId: params.user,
                    },
                });
                if (rejectTarget) {
                    await rejectTarget.destroy();
                }
                break;
            case 'ACCEPT':
                if (eventRes.organizerId !== userId) throw "NOT_EVENT_OWNER";
                if (!params.user)                    throw "MISSING_USER_PARAM";
                const acceptTarget = await event_user.findOne({
                    where: {
                        eventId: params.event,
                        userId: params.user,
                    },
                });
                if (acceptTarget) {
                    await acceptTarget.update({ status: 'MEMBER' });
                }
                break;
            case 'CHECK_IN':
                if (!eventUser) throw "HAVENT_JOIN_EVENT";
                await eventUser.update({ status: 'PARTICIPATED' })
                break;
            case 'QUIT':
                if (!eventUser) throw "HAVENT_JOIN_EVENT";
                await eventUser.destroy();
                break;
            case 'START_EVENT':
                if (eventRes.organizerId !== userId) throw "NOT_EVENT_OWNER";
                await eventRes.update({ status: 'START' });
                break;
            case 'END_EVENT':
                if (eventRes.organizerId !== userId) throw "NOT_EVENT_OWNER";
                await eventRes.update({ status: 'END' });
                break;
        }

        return {};
    },
};