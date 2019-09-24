module.exports = ({
    voucher,
    post,
    user_voucher
}) =>
{
    voucher.hasMany(post, { foreignKey: 'voucherId' });
    voucher.hasMany(user_voucher, { foreignKey: 'voucherId' });
};