module.exports = ({
    shop,
    post
}) =>
{
    post.belongsTo(shop, { foreignKey: 'shopId' });
};