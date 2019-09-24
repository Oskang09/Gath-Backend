module.exports = ({
    shop,
    post,
    voucher
}) =>
{
    post.belongsTo(shop, { foreignKey: 'shopId' });
    post.belongsTo(voucher, { foreignKey: 'voucherId' });
};