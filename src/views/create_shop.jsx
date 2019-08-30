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

    return (
        <form action="?action=createShop" method="POST" encType="multipart/form-data">
            <h1>Create Shop</h1>

            Shop Name: 
            <input type="text" name="name" />
            
            <br />

            Location:
            <input type="text" name="location" />

            <br />

            Shop Icon:
            <input type="file" name="image" />

            <br />

            Shop Type:
            <input type="text" name="type" />

            <br />

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="submit" value="Submit" />
        </form>
    );
};

module.exports = Component;
