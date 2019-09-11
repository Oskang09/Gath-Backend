const React = require('react');

const typeSelection = [
    { value: 'FOOD', display: 'Food' },
    { value: 'WATER', display: 'Water' },
];

function Component(props) {

    if (props.response) {
        const post = props.response;
        return (
            <div>
                <h1>Created New Post</h1>
                <p>ID : {post.id}</p>
                <p>Title : {post.title}</p>
                <p>Content : {post.content}</p>
                <p>Type : {post.type}</p>
                <p>Image: </p><img src={post.image} />
            </div>
        );
    }

    const { Input, Form } = props.components;
    return (
        <Form api="createPost" title="Create Post" csrf={props.csrf} error={props.error}>
            <Input label="Shop ID : " field="shop" input="number" />
            <Input label="Voucher ID : " field="voucher" input="number" />
            <Input label="Title : " field="title" input="text" />
            <Input label="Banner : " field="image" input="file" />
            <Input label="Content : " field="content" input={{ type: "textarea", rows: 5, cols: 50 }} />
            <Input label="Type : " field="type" input="selection" selection={typeSelection} />
        </Form>
    );
};

module.exports = Component;
