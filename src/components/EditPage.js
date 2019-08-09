import React, {useState, useEffect} from "react";
import ItemList from "./ItemList";
import data from "../data.json";

function MainPage() {
    return (
        <div className="container">
            <form>
                <input type="text" name="title"/>
                <input type="text" name="comment"/>
            </form>
        </div>
    );
}

export default MainPage;
