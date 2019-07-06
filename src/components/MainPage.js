import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import data from "../data.json";

function MainPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  return (
    <div className="container">
      <h1>Items</h1>
      <ItemList items={items} />
    </div>
  );
}

export default MainPage;
