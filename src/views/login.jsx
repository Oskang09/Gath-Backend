const React       = require('react');

function Component(props) {
    return (
        <form action="?action=adminLogin" method="POST" encType="multipart/form-data">
            <h1>Login</h1>

            Username: <input type="text" name="username" />
            
            <br />

            Password: <input type="password" name="password" />

            <br />

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="submit" value="Submit" />

            { props.response && <p>{props.response}</p> }
        </form>
    );
};

module.exports = Component;
