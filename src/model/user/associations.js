module.exports = ({
    event,
    user,
    event_user,
}) =>
{
    user.hasMany(event, { foreignKey: 'organizerId' });
    user.belongsToMany(event, {
        through: {
            model: event_user,
        },
        foreignKey: 'userId',
    });
};