module.exports = ({
    event,
    user,
    event_user,
}) =>
{
    event_user.belongsTo(user, { foreignKey: 'userId' });
    event_user.belongsTo(event, { foreignKey: 'eventId' });
};