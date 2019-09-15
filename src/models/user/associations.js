module.exports = ({
    user,
    comment,
    notification,
    event_user,
    user_voucher
}) =>
{
    user.hasMany(comment, { foreignKey: 'userId' });
    user.hasMany(notification, { foreignKey: 'userId' });
    user.hasMany(event_user, { foreignKey: 'userId' });
    user.hasMany(user_voucher, { foreignKey: 'userId' });
};