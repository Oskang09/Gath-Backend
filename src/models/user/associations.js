module.exports = ({
    event,
    user,
    event_user,
    voucher,
    user_voucher,
    comment
}) =>
{
    user.hasMany(comment, { foreignKey: 'userId' });
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