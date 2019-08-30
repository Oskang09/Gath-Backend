module.exports = ({
    shop,
    post,
    voucher
}) =>
{
    post.belongsTo(shop, { foreignKey: 'shopId' });
    post.hasOne(voucher, { foreignKey: 'voucherId' });
};