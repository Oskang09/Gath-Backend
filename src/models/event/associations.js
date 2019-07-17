module.exports = ({
    event,
    user,
    event_user,
}) =>
{
    event.belongsTo(user, { foreignKey: 'organizerId' });
    event.belongsToMany(user, {
        through: {
            model: event_user,
        },
        foreignKey: "eventId",
    });
};