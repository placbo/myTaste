import "./ItemList.css";
import {Link} from "react-router-dom";
import React from "react";


function ItemList(props) {
    let itemArray = [];
    for (const id in props.items) {  //TODO: this is shait!  hvordan iterere skikkelig ????
        let item = props.items[id];
        item.id = id;
        itemArray.push(item);
    }

     props.items.each((rall) => {
         console.log(rall)
     });

    return (
        <div className="itemListWrapper">
            {itemArray.map(item => {
                return (
                    <Link key={item.id} to={"/item/" + item.id}>
                        <div className="card">
                            <div className="header">{item.title}</div>
                            <img src={"/img/" + item.imageLink} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="diceValue">{item.diceValue}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    )
}

export default ItemList;
