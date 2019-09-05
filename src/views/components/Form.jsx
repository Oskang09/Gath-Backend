const React = require('react');

function Form(props) {
    return (
        <form
            className="pure-form pure-form-aligned"
            action={`?action=${props.api}`}
            method="POST"
            encType="multipart/form-data"
        >
            <h1>{props.title}</h1>
            <fieldset>
                <div className="pure-control-group">
                    {props.children}
                </div>
            <input
                type="submit"
                value="Submit"
                className="pure-button pure-button-primary"
            />
            </fieldset>

            { props.error && <p>{props.error.toJSON ? JSON.stringify(props.error) : props.error.toString()}</p> }
        </form>
    ) 
};

module.exports = Form;