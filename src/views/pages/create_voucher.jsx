const React = require('react');

function Component(props) {

    if (props.response) {
        const voucher = props.response;
        return (
            <div>
                <h1>Created New Vouher</h1>
                <p>Title : {voucher.title}</p>
                <p>Description : {voucher.description}</p>
                <p>Count : {voucher.count}</p>
                <p>Shop ID : {voucher.shopId}</p>
                <p>Expired At : {voucher.expiredAt.toString()}</p>
                <p>Image : </p><img src={voucher.image} />
            </div>
        );
    }

    const { Input, Form } = props.components;
    return (
        <Form api="createVoucher" title="Create Voucher" csrf={props.csrf} error={props.error}>
            <Input label="Title : " field="title" input="text" />
            <Input label="Description : " field="description" input={{ type: "textarea", rows: 5, cols: 50 }} />
            <Input label="Count : " field="count" input="number" />
            <Input label="Shop ID : " field="shop" input="number" />
            <Input label="Expired At : " field="expiredAt" input="date" />
            <Input label="Image : " field="image" input="file" />
        </Form>
    );
};

module.exports = Component;
