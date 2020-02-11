import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ItemList from "../components/ItemList";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import { getAllItems, getUserProfile } from "../api/itemApi";
import { toast } from "react-toastify";
import queryString from "query-string";

const PageContent = styled.div`
  margin: 1rem;
`;

function ItemListPage() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const query = queryString.parse(window.location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      history.push("/");
    }

    getAllItems()
      .then(result => setItems(result))
      .catch(error => toast.error(error.message));

    getUserProfile()
      .then(result => setUser(result))
      .catch(error => toast.error(error.message));
  }, [history]);

  return (
    <>
      <Header user={user}/>
      <PageContent>
        <ItemList items={items} />
        <Link to={"/newitem/"}>New item...</Link>
        <p>App version: {process.env.REACT_APP_VERSION}</p>
      </PageContent>
    </>
  );
}

export default ItemListPage;
