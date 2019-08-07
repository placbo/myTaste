import React from "react";
import "./ItemList.css";
import {getItems} from "../api/itemApi";

class ItemList extends React.Component {
    state = {
        items: []
    };

    componentDidMount() {
        getItems().then(items => this.setState({items: items}));
    }

    render() {
        return (
            <div className="itemWrapper">
                {this.state.items.map(item => {
                    return (
                        <div className="card">
                            <div className="header">{item.title}</div>
                            <img src={item.id + ".jpg"} class="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-text">{item.comment}</p>
                                <p className="diceValue">{item.diceValue}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default ItemList;
