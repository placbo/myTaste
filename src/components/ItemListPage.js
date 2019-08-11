import React, {useState, useEffect} from "react";
import ItemList from "./ItemList";
import {getItems} from "../api/itemApi";
import {Link} from "react-router-dom";

function ItemListPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems().then(_items => setItems(_items));
    }, []);

    return (
        <div className="container ">
            <h1>Items</h1>
            <Link  to={"/newitem/"}>new...</Link>
            <ItemList items={items}/>
        </div>
    );
}

ItemListPage.defaultProps = {
    items: []
};

export default ItemListPage;
