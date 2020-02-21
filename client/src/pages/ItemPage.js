import React, { useState, useEffect, useContext } from "react";
import { getItem, deleteItem } from "../api/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import { store } from "../store";

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const Card = styled.div`
  background-color: ${props => props.theme.box};
  border-radius: 8px;
  display: flex;
  max-width: 50rem;
  margin: 0rem auto;
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

const ContentLineWrapper = styled.div`
  margin-bottom: 1rem;
`;
const YourRatingWrapper = styled.div`
  margin-top: 1.5rem;
  border: 1px solid ${props => props.theme.secondary};
  border-radius: 4px;
  padding: 10px;
`;

const CardFooter = styled.div`
  height: 3rem;
  margin-top: 1rem;
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
  const state = useContext(store);

  const [item, setItem] = useState([]);
  const [userRating, setUserRating] = useState(3);

  useEffect(() => {
    const id = props.match.params.id; // from the path `/:id`
    if (id) {
      getItem(id)
        .then(_item => {
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

  const handlaRatingChange = (event,value) => {
    setUserRating(value);
    toast.info("Saving not implemented");
    //SAVE
  };

  return (
    <PageContent>
      <Card>
        <CardHeading>{item.title}</CardHeading>
        {item.image && (
          <ContentLineWrapper>
            <a href={`${CONTENT_BASE_URL}/${item.image}`}>
              <ContentImage
                src={`${CONTENT_BASE_URL}/thumb/${item.image}`}
                alt="image"
              />
            </a>
          </ContentLineWrapper>
        )}
        <ContentLineWrapper>
          <p className="card-text">{item.comment}</p>
        </ContentLineWrapper>
        <ContentLineWrapper>
          <TagList>{item.tags}</TagList>
        </ContentLineWrapper>
        {item.diceValue && (
          <Rating name="simple-controlled" readOnly value={+item.diceValue} />
        )}
        {state.state?.role === "admin" && (
          <CardFooter>
            <Link to={"/item/" + item._id + "/edit/"}>
              <button className="btn btn-primary">Edit...</button>
            </Link>
            <button className="btn btn-dark" onClick={handleDeleteItem}>
              Delete
            </button>
          </CardFooter>
        )}
        {state.state?.googleId && state.state?.role !== "admin" && (
          <YourRatingWrapper>
            <p>Your rating:</p>
            <Rating
              name="simple-controlled"
              value={userRating}
              onChange={handlaRatingChange}
            />
          </YourRatingWrapper>
        )}
      </Card>
    </PageContent>
  );
};

export default ItemListPage;
