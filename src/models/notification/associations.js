module.exports = ({
    user,
    notification
}) =>
{
    notification.belongsTo(user, { foreignKey: 'userId' });
};