module.exports = ({
    event,
    event_user,
    comment,
    notification
}) =>
{
    event.hasMany(notification, { foreignKey: 'eventId' });
    event.hasMany(comment, { foreignKey: 'eventId' });
    event.hasMany(event_user, { foreignKey: 'eventId' });
};