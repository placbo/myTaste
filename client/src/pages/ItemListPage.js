import React, {useEffect, useState} from "react";
import ItemList from "./ItemList";
import styled from "styled-components";
import {getAllItems} from "../api/api";
import { toast } from "react-toastify";

const PageContent = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

function ItemListPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems()
      .then(result => setItems(result))
      .catch(error => toast.error(error.message));
  }, []);

  return (
    <>
      <PageContent>
        <ItemList items={items} />
      </PageContent>
    </>
  );
}

export default ItemListPage;
