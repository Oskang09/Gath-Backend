const React       = require('react');

function Component(props) {
    const { Input, Form } = props.components;
    return (
        <Form api="adminLogin" title="Login" csrf={props.csrf} error={props.response}>
            <Input label="Username : " field="username" input="text" />
            <Input label="Password : " field="password" input="password" />
        </Form>
    );
};

module.exports = Component;
