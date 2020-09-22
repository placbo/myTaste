import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {store} from "../store";
import * as firebase from "firebase";
import {ITEM_COLLECTION_NAME} from "../api/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Rating from "@material-ui/lab/Rating";
import {AuthContext} from "../Auth";


const PageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  background-color: ${props => props.theme.box};
  border-radius: 8px;
  display: flex;
  max-width: 50rem;
  margin: 0 auto;
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
// const YourRatingWrapper = styled.div`
//   margin-top: 1.5rem;
//   border: 1px solid ${props => props.theme.secondary};
//   border-radius: 4px;
//   padding: 10px;
// `;

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

const ItemListPage = ({match, history}) => {
    const state = useContext(store);
    const {currentUser, isAdmin} = useContext(AuthContext);
    const [item, setItem] = useState({});
    // const [rating, setRating] = useState({});
    // const [userRating, setUserRating] = useState(3);
    // const [hasUserRated, setHasUserRated] = useState(false);

    useEffect(() => {
        const id = match.params.id; // from the path `/:id`
        if (id) {

            firebase
                .firestore()
                .collection(ITEM_COLLECTION_NAME)
                .doc(id)
                .get()
                .then(doc => {
                    setItem({
                        ...doc.data(),
                        id: doc.id
                    });
                })
                .catch(error => toast.error(error.message));

            //   //     getAverageRating(id).then( result => {
            //   //         setRating( result);
            //   //     } );
            //   //     state.state?.googleId &&
            //   //     getRating(item.id, state.state?.googleId)
            //   //       .then(rating => {
            //   //         if (rating) setHasUserRated(true);
            //   //         setUserRating(+(rating.rating));
            //   //       })
            //   //       .catch(error => console.log(error));
            //   })
        }
  }, [item.id, match.params.id, state.state]);

    const handleDeleteItem = () => {
        if (window.confirm("Sure?")) {
            firebase
                .firestore()
                .collection(ITEM_COLLECTION_NAME)
                .doc(item.id)
                .delete()
                .then(() => {
                    toast.success("item deleted");
                    history.push("/");
                })
                .catch(error => toast.error(error.message));
        }
    };

    // const handleRatingChange = (event, value) => {
    //   setUserRating(value);
    //   rateItem(item.id, state.state?.googleId, value)
    //     .then(_item => {
    //       setHasUserRated(true);
    //       toast.success("Lagret");
    //     })
    //     .catch(error => toast.error(error.message));
    // };

    return (
        <>
            <Header/>
            <PageContent>
                <Card>
                    <CardHeading>{item.title}</CardHeading>
                    {item.image && (
                        <ContentLineWrapper>
                            <a href={item.image}>
                                <ContentImage
                                    src={item.image}
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
                    {/*{rating.average && (*/}
                    {/*    <>*/}
                    {/*
                      <Rating name="simple-controlled" readOnly value={+rating.average} />
                    */}
                    {item.rating &&
                    <Rating name="simple-controlled" readOnly value={item.rating}/>
                    }
                    {/*  ({rating.count} vote(s))</>*/}
                    {/*)}*/}
                    {/*{state.state?.role === "admin" && (*/}
                    {isAdmin &&
                        <CardFooter>
                            <Link to={`/item/${item.id}/edit/`}>
                                <button className="btn btn-primary">Edit...</button>
                            </Link>
                            <button className="btn btn-dark" onClick={handleDeleteItem}>
                                Delete
                            </button>
                        </CardFooter>
                    }
                    {/*)}*/}
                    {/*{state.state?.googleId && state.state?.role !== "admin" && (*/}
                    {/*  <YourRatingWrapper>*/}
                    {/*    {hasUserRated ? <p>Your rating:</p> : <p>Rate this item</p>}*/}
                    {/*                        <Rating
                          name="simple-controlled"
                          value={userRating}
                          onChange={handleRatingChange}
                        />*/}
                    {/*  </YourRatingWrapper>*/}
                    {/*)}*/}
                </Card>
            </PageContent>
            <Footer/>
        </>
  );
};

export default ItemListPage;
