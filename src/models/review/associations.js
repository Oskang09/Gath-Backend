module.exports = ({
    review,
    user,
    event
}) =>
{
    review.belongsTo(user, { foreignKey: 'fromUserId' });
    review.belongsTo(user, { foreignKey: 'toUserId' });
    review.belongsTo(event, { foreignKey: 'eventId' });
};