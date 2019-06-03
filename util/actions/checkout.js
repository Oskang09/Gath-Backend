const { extend } = require('@utils');

module.exports = async (cart, { product, topping }) => {
    const productIds = [];
    const toppingIds = [];

    for (const { productId, toppings } of cart) {
        productIds.push(productId);
        extend(toppingIds, toppings);
    }

    const products = await product.find({ 
        id: [... new Set(productIds)],
        paginate: false,
    });
    const _toppings = await topping.find({ 
        id: [...new Set(toppingIds)],
        paginate: false,
    });

    const orders = [];
    let sub_total = 0;
    let total = 0;

    for (const { id, productId, remark, takeaway, toppings, count = 1, status, order_time } of cart) {
        const product = products.find(productData => productData.id == productId);
        if (!product) {
            throw Error(`checkout.invalid_product`);
        }

        const product_price = ( product.price * count );
        const topping_order = [];
        let topping_price = 0;
        if (toppings && toppings.length > 0) {
            for (const toppingId of toppings) {
                const topping = _toppings.find(topping => topping.id === toppingId);
                topping_price += topping.price;
                topping_order.push({
                    code: topping.code,
                    name: topping.name,
                    price: topping.price
                });
            }
        }

        orders.push({
            id,
            product: productId,
            takeaway,
            remark,
            count,
            code: product.code,
            name: product.name,
            desc: product.desc,
            price: {
                product: product_price,
                topping: topping_price,
                with_topping: product_price + topping_price,
            },
            toppings: topping_order,
            status,
            order_time,
        });
        sub_total += ( product_price + topping_price );
    }
    total += sub_total;

    return {
        payment: { sub_total, total },
        orders,
    };
}