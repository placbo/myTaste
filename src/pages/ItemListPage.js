import React, { useState, useEffect } from "react";
import ItemList from "../components/ItemList";
import { getItems } from "../api/itemApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import styled from "styled-components";

const PageContent = styled.div`
  margin: 1rem;
`;

function ItemListPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems()
      .then(_items => setItems(_items))
      .catch(() => toast.error("Could retrieve get items from server"));
  }, []);

  return (
    <>
      <Header title="Items" />
      <PageContent>
        <Link to={"/newitem/"}>New item...</Link>
        <ItemList items={items} />
        <Link to={"/newitem/"}>New item...</Link>
        <p>App version: {process.env.REACT_APP_VERSION}</p>
      </PageContent>
    </>
  );
}

export default ItemListPage;
