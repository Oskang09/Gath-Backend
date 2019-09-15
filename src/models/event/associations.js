module.exports = ({
    event,
    event_user,
    shop,
    comment,
}) =>
{
    event.hasMany(comment, { foreignKey: 'eventId' });
    event.belongsTo(shop, { foreignKey: 'shopId' });
    event.hasMany(event_user, { foreignKey: 'eventId' });
};