module.exports = ({
    event,
    user,
    event_user,
    voucher,
    user_voucher,
}) =>
{
    user.hasMany(event, { foreignKey: 'organizerId' });
    user.belongsToMany(event, {
        through: {
            model: event_user,
        },
        foreignKey: 'userId',
    });
    user.belongsToMany(voucher, {
        through: {
            model: user_voucher,
        },
        foreignKey: "userId",
    });
};