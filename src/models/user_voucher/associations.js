module.exports = ({
    voucher,
    user,
    user_voucher,
}) =>
{
    user_voucher.belongsTo(user, { foreignKey: 'userId' });
    user_voucher.belongsTo(voucher, { foreignKey: 'voucherId' });
};