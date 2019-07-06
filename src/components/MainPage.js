import React from "react";
import ItemList from "./ItemList";

function MainPage() {
  let items = [
    {
      id: 1,
      comment: "Toro kakemix. why!",
      dice: 2
    },
    {
      id: 2,
      comment: "Idun Ketchup. Nei takk, men Funker til alt for barna",
      dice: 3
    }
  ];
  return (
    <div className="container">
      <h1>Items</h1>
      <ItemList items={items} />
    </div>
  );
}

export default MainPage;
