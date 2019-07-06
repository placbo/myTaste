import React from "react";
import "./ItemList.css";

function ItemList(props) {
  return (
    <div className="itemWrapper">
      {props.items.map(item => {
        return (
          <div className="card">
            <img src={item.id + ".jpg"} class="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">{item.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ItemList;
