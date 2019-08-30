module.exports = ({
    voucher,
    event,
    user,
    user_voucher,
    post
}) =>
{
    voucher.belongsTo(event, { foreignKey: 'voucherId' });
    voucher.belongsTo(post, { foreignKey: 'voucherId' });
    voucher.belongsToMany(user, {
        through: {
            model: user_voucher,
        },
        foreignKey: "voucherId",
    });
};