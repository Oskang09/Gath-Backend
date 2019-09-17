module.exports = ({
    user,
    notification,
    event,
}) =>
{
    notification.belongsTo(user, { foreignKey: 'userId' });
    notification.belongsTo(event, { foreignKey: 'eventId' });
};