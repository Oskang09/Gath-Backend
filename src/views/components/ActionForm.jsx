const React = require('react');

function ActionForm(props) {
    return (
        <form
            className="pure-form pure-form-aligned"
            action={`?action=${props.api}`}
            method="POST"
            encType="multipart/form-data"
            style={props.style}
        >
            {props.children}
            {props.button}
        </form>
    );
}

module.exports = ActionForm;