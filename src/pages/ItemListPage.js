import React, { useState, useEffect } from "react";
import ItemList from "../components/ItemList";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import styled from "styled-components";
import Axios from 'axios';

const PageContent = styled.div`
  margin: 1rem;
`;

const ITEMS_URL = process.env.REACT_APP_MYTASTE_API_HOST + "/mytasteapi/items/";

function ItemListPage() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    Axios.get(ITEMS_URL)
      .then(res => {
        console.log(res);
        setItems(res.data);
      })
      .catch(error => toast.error());
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
