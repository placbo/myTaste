import React from "react";

function ItemList(props) {
  return (
    <div>
      {props.items.map(item => {
        return (
          <div className="card">
            <img src="..." class="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">{item.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ItemList;
