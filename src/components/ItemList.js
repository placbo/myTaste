import {Link} from "react-router-dom";
import React from "react";


function ItemList(props) {
    const CONTENT_BASE_URL = process.env.REACT_APP_MYTASTE_CONTENT_HOST;
    return (
        <div className="itemListWrapper">
            {props.items.map(item => {
                return (
                    <Link key={item._id} to={"/item/" + item._id}>
                        <div className="card">
                            <div className="header">{item.title}</div>
                            {item.image &&<img src={`${CONTENT_BASE_URL}/mytastecontent/${item.image}`} className="card-img-top" alt="..."/>}
                            <div className="card-body">
                                {item.diceValue && <img className="diceValue" src={`/img/dice_${item.diceValue}.png`} alt={item.diceValue}/>}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    )
}

export default ItemList;
