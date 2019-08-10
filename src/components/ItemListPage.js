import React, {useState, useEffect} from "react";
import ItemList from "./ItemList";
import {getItems} from "../api/itemApi";

function ItemListPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems().then(_items => setItems(_items));
    }, []);

    return (
        <div className="container ">
            <h1>Items</h1>
            <ItemList items={items}/>
        </div>
    );
}

ItemListPage.defaultProps = {
    items: []
};

export default ItemListPage;
