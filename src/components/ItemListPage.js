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
        <>
            <div className="pageheading">Items</div>
            <Link  to={"/newitem/"}>New item...</Link>
            <br/>
            <ItemList items={items}/>
            <br/>
            <Link  to={"/newitem/"}>New item...</Link>
            <pre>App version: {process.env.REACT_APP_VERSION}</pre>
        </>
    );
}

ItemListPage.defaultProps = {
    items: []
};

export default ItemListPage;
