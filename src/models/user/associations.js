module.exports = ({
    user,
    comment,
    notification,
    event_user,
    user_voucher,
    review
}) =>
{
    user.hasMany(comment, { foreignKey: 'userId' });
    user.hasMany(notification, { foreignKey: 'userId' });
    user.hasMany(event_user, { foreignKey: 'userId' });
    user.hasMany(user_voucher, { foreignKey: 'userId' });
    user.hasMany(review, { foreignKey: 'fromUserId', as: 'fromUser' });
    user.hasMany(review, { foreignKey: 'toUserId', as: 'toUser' });
};