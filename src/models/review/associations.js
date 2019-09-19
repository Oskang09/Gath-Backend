module.exports = ({
    review,
    user,
    event
}) =>
{
    review.belongsTo(user, { foreignKey: 'fromUserId', as: 'fromUser' });
    review.belongsTo(user, { foreignKey: 'toUserId', as: 'toUser' });
    review.belongsTo(event, { foreignKey: 'eventId' });
};