import React, { useState, useEffect } from "react";
import { getItem, deleteItem } from "../api/itemApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Header from "../components/Header";

const Card = styled.div`
  background-color: ${props => props.theme.box};
  margin: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align:center;
  :hover {
    background-color: ${props => props.theme.boxHover};
  }
`;

const DiceValue = styled.img`
  width: 50px;
`;

const ContentImage = styled.img`
  width: auto;
  height: auto;
  max-height: 300px;
  max-width: 300px;
  margin: auto;
  padding: 10px;
`;

const CardHeading = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ItemListPage = props => {
  const CONTENT_BASE_URL = process.env.REACT_APP_MYTASTE_CONTENT_HOST;

  const [item, setItem] = useState([]);

  useEffect(() => {
    const id = props.match.params.id; // from the path `/:id`
    if (id) {
      getItem(id).then(_item => setItem(_item));
    }
  }, [props.match.params.id]);

  const handleDeleteItem = () => {
    if (window.confirm("Sure?")) {
      deleteItem(item._id).then(() => {
        toast.success("item deleted");
        props.history.push("/");
      });
    }
  };

  return (
    <>
      <Header title="Items" />
      <Card>
        <CardHeading>{item.title}</CardHeading>
        {item.image && (
          <ContentImage
            src={`${CONTENT_BASE_URL}/thumb/${item.image}`}
            alt="..."
          />
        )}
        <div className="card-body">
          <p className="card-text">{item.comment}</p>
          {item.diceValue && (
            <DiceValue
              src={`/img/dice_${item.diceValue}.png`}
              alt={item.diceValue}
            />
          )}
        </div>
        <Link to={"/item/" + item._id + "/edit/"}>
          <div>edit...</div>
        </Link>
      </Card>
      <button onClick={handleDeleteItem}>Delete!</button>
    </>
  );
};

export default ItemListPage;
