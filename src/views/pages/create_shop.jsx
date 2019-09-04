const React = require('react');

function Component(props) {

    if (props.response) {
        const shop = props.response;
        return (
            <div>
                <h1>Created New Shop</h1>
                <p>ID : {shop.id}</p>
                <p>Name : {shop.name}</p>
                <p>Locate : {shop.locate}</p>
                <p>Image: </p><img src={shop.image} />
            </div>
        );
    }

    const { Input, Form } = props.components;
    return (
        <Form api="createShop" title="Create Shop" csrf={props.csrf} error={props.error}>
            <Input label="Shop Name : " field="name" input="text" />
            <Input label="Location : " field="location" input="text" />
            <Input label="Shop Icon : " field="image" input="file" />
            <Input label="Shop Type : " field="type" input="text" />
        </Form>
    );
};

module.exports = Component;
