module.exports = ({
    event,
    event_user,
    user,
    shop,
    comment,
}) =>
{
    event.hasMany(comment, { foreignKey: 'eventId' });
    event.belongsTo(shop, { foreignKey: 'shopId' });
    event.belongsToMany(user, {
        through: {
            model: event_user,
        },
        foreignKey: "eventId",
    });
};