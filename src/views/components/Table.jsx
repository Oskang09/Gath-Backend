const React = require('react');


const buildHeader = function (header, index) {
    return (
        <th key={`header-${index}`}>
            { header.charAt(0).toUpperCase() + header.slice(1) }
        </th>
    );
};

const buildRows = function (headers) {
    return function buildCell(row, index) {
        const cells = [];
        for (const field of headers) {
            cells.push(
                <td key={`cell-${field}`}>
                { transformCell(row[field]) }
                </td>
            );
        }
        return <tr key={`row-${index}`}>{cells}</tr>
    };
};

const transformCell = function (value) {
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
                    { fields.map(buildHeader) }
                </tr>
            </thead>

            <tbody>
                { rows.map(buildRows(fields)) }
            </tbody>
        </table>
    )
}

module.exports = Table;