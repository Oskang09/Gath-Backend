module.exports = ({
    shop,
    promo
}) =>
{
    shop.hasMany(promo, { foreignKey: 'shopId' });
};