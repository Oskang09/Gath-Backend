module.exports = ({
    shop,
    post,
    event
}) =>
{
    shop.hasMany(event, { foreignKey: 'shopId' });
    shop.hasMany(post, { foreignKey: 'shopId' });
};