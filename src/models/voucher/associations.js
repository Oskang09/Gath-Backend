module.exports = ({
    voucher,
    post,
    user_voucher
}) =>
{
    voucher.belongsTo(post, { foreignKey: 'voucherId' });
    voucher.hasMany(user_voucher, { foreignKey: 'voucherId' });
};