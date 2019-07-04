module.exports = ({
    shop,
    promo
}) =>
{
    promo.belongsTo(shop, { foreignKey: 'shopId' });
};