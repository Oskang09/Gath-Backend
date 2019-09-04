module.exports = ({
    voucher,
    user,
    user_voucher,
    post
}) =>
{
    voucher.belongsTo(post, { foreignKey: 'voucherId' });
    voucher.belongsToMany(user, {
        through: {
            model: user_voucher,
        },
        foreignKey: "voucherId",
    });
};