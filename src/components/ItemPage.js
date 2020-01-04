import React, {useState, useEffect} from "react";
import {getItem} from "../api/itemApi";
import {Link} from "react-router-dom";

//another way to declare a functional component
const ItemListPage = props => {

    const [item, setItem] = useState([]);

    useEffect(() => {
        const id = props.match.params.id; // from the path `/:id`
        if (id) {
            getItem(id).then(_item => setItem(_item));
        }
    }, [props.match.params.id]);

    return (
        <div className="container">
            <h1>Item</h1>
            <div className="itemWrapper">
                <div className="card">
                    <div className="header">{item.title}</div>
                    <img src={"/img/content/" + item.imageName} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <p className="card-text">{item.comment}</p>
                        <img className="diceValue" src={`/img/dice_${item.diceValue}.png`} alt={item.diceValue}/>
                    </div>
                    <Link to={"/item/" + item._id + "/edit/"}>
                        <div>edit...</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ItemListPage;
