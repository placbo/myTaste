import React, { useState, useEffect } from "react";
import { getItem, deleteItem } from "../api/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";

const PageContent = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;
const Card = styled.div`
  background-color: ${props => props.theme.box};
  border-radius: 8px;
  display: flex;
  max-width: 50rem;
  margin: 1rem auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
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

const TagList = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;

const CardFooter = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 1rem;
    height: 2.5rem;
  }
`;

const ItemListPage = props => {
  const CONTENT_BASE_URL = process.env.REACT_APP_MYTASTE_CONTENT_HOST;

  const [item, setItem] = useState([]);

  useEffect(() => {
    const id = props.match.params.id; // from the path `/:id`
    if (id) {
      getItem(id)
        .then(_item => {
          console.log("item", _item);
          setItem(_item);
        })
        .catch(error => toast.error(error.message));
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
    <PageContent>
      <Card>
        <CardHeading>{item.title}</CardHeading>
        {item.image && (
          <ContentImage
            src={`${CONTENT_BASE_URL}/thumb/${item.image}`}
            alt="..."
          />
        )}
        <p className="card-text">{item.comment}</p>
        <TagList>{item.tags}</TagList>
        {item.diceValue && (
          <Rating name="simple-controlled" readOnly value={item.diceValue} />
        )}
        <CardFooter>
          <Link to={"/item/" + item._id + "/edit/"}>
            <button className="btn btn-primary">Edit...</button>
          </Link>
          <button className="btn btn-dark" onClick={handleDeleteItem}>
            Delete
          </button>
        </CardFooter>
      </Card>
    </PageContent>
  );
};

export default ItemListPage;
