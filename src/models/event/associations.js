module.exports = ({
    event,
    user,
    event_user,
    shop,
}) =>
{
    event.belongsTo(user, { foreignKey: 'organizerId' });
    event.belongsTo(shop, { foreignKey: 'shopId' });
    event.belongsToMany(user, {
        through: {
            model: event_user,
        },
        foreignKey: "eventId",
    });
};