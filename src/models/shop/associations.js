module.exports = ({
    shop,
    post
}) =>
{
    shop.hasMany(post, { foreignKey: 'shopId' });
};