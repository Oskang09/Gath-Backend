const React = require('react');

function Component(props) {
    if (Object.keys(props.data).length === 0) {
        return <p>Missing data.</p>;
    }
    const { Table } = props.components;
    return <Table style={{ margin: 10 }} rows={props.data.findShop.result} />;
}

module.exports = Component;
