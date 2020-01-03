import "./ItemList.css";
import {Link} from "react-router-dom";
import React from "react";


function ItemList(props) {
    return (
        <div className="itemListWrapper">
            {props.items.map(item => {
                return (
                    <Link key={item._id} to={"/item/" + item._id}>
                        <div  className="card">
                            <div className="header">{item.title}</div>
                            <img src={`/imgPCB/${item.imageLink}`} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <img className="diceValue" src={`/img/${item.diceValue}.png`} alt={item.diceValue}/>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    )
}

export default ItemList;
