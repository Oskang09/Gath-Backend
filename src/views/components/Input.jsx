const React = require('react');

function Input(props) {
    const { field, label, input, selection } = props;
    const inputProps = typeof input !== 'object' ?
        { type: input } :
        input;
    
    let component;
    switch (inputProps.type) {
        case 'selection':
            component = (
                <select id={field} name={field} {...inputProps}>
                    {
                        selection.map(
                            ({ value, display }, index) => (
                                <option key={`select-${display}`} selected={index === 0} value={value}>{display}</option>
                            )
                        )
                    }
                </select>
            );
            break;
        case 'textarea':
            component = <textarea id={field} name={field} {...inputProps}  />;
            break;
        default:
            component = <input id={field} name={field} {...inputProps} />;
            break;
    }
    return (
        <div key={field} style={{ margin: 10 }}>
            <label htmlFor={field}>{label}</label>
            { component }
        </div>
    );
}

module.exports = Input;