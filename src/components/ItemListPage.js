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
            <div>Items</div>
            <Link  to={"/newitem/"}>New item...</Link>
            <ItemList items={items}/>
            <Link  to={"/newitem/"}>New item...</Link>
        </div>
    );
}

ItemListPage.defaultProps = {
    items: []
};

export default ItemListPage;
