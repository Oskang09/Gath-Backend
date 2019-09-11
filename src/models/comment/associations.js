module.exports = ({
    event,
    user,
    comment
}) =>
{
    comment.belongsTo(event, { foreignKey: 'eventId' });
    comment.belongsTo(user, { foreignKey: "userId" });
};