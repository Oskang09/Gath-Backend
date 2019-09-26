module.exports = ({
    voucher,
    post,
    shop,
    user_voucher,
}) =>
{
    voucher.hasMany(post, { foreignKey: 'voucherId' });
    voucher.belongsTo(shop, { foreignKey: 'shopId' });
    voucher.hasMany(user_voucher, { foreignKey: 'voucherId' });
};