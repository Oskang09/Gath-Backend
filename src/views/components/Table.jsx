const ActionForm = require('./ActionForm');
const React = require('react');

const buildHeader = function (header, index) {
    return (
        <th key={`header-${index}`}>
            {header.charAt(0).toUpperCase() + header.slice(1)}
        </th>
    );
};

const buildDelete = function (id, deleteAction) {
    return (
        <td key="delete">
            <ActionForm
                style={{ display: 'table-cell' }}
                api={deleteAction}
                button={
                    <input
                        className="pure-button"
                        style={{ background: 'rgb(202, 60, 60)', color: 'white' }}
                        type="submit"
                        value="DELETE"
                    />
                }
            >
                <input type="hidden" name="id" value={id} />
            </ActionForm>
        </td>
    );
};

const buildRows = function (headers, props) {
    return function buildCell(row, index) {
        const cells = [];
        for (const field of headers) {
            cells.push(
                <td key={`cell-${field}`}>
                    {transformCell(row[field])}
                </td>
            );
        }
        cells.push(buildDelete(row.id, props.deleteAction));
        return <tr key={`row-${index}`}>{cells}</tr>
    };
};

const transformCell = function (value) {
    if (!value) {
        return "NULL";
    }

    if (value.constructor === Date) {
        return value.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }

    if (value.toJSON || typeof value === 'object') {
        return JSON.stringify(value);
    }

    if (value.toString) {
        return value.toString();
    }
};

function Table(props) {
    const { rows } = props;
    if (rows.length === 0) {
        return <p>No data for show.</p>;
    }
    const fields = Object.keys(rows[0]);
    return (
        <table className="pure-table pure-table-bordered">
            <thead>
                <tr>
                    {fields.map(buildHeader)}
                    <th style={{ textAlign: 'center' }} colSpan={2}>Actions</th>
                </tr>
            </thead>

            <tbody>
                {rows.map(buildRows(fields, props))}
            </tbody>
        </table>
    )
}

module.exports = Table;