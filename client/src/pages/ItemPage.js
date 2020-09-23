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
  min-width:20rem;
  width:80%;
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

const ItemListPage = ({match, history}) => {
    const state = useContext(store);
    const {currentUser, isAdmin} = useContext(AuthContext);
    const [item, setItem] = useState({});
    const [averageRating, setAverageRating] = useState({});
    const [userRating, setUserRating] = useState(3);
    const [hasUserRated, setHasUserRated] = useState(false);

    useEffect(() => {
        const id = match.params.id; // from the path `/:id`
        if (id) {
            //TODO: MOVE TO API-UTILS
            firebase
                .firestore()
                .collection(ITEM_COLLECTION_NAME)
                .doc(id)
                .get()
                .then(doc => {
                    setItem({
                        ...doc.data(),
                        id: doc.id,
                    });
                })
                .catch(error => toast.error(error.message));
        }
    }, [item.id, match.params.id, state.state]);

    useEffect(() => {
        if (item.ratings && Object.values(item.ratings).length > 0) {
            calculateAverage();
            if (currentUser && item.ratings[currentUser.email]){
                setUserRating(item.ratings[currentUser.email]);
                setHasUserRated(true);
            }
        }
    }, [item.ratings,currentUser]);

    const calculateAverage = () => {
        const ratingsArray = Object.values(item.ratings);
        const average = ratingsArray.reduce((a, b) => a + b) / ratingsArray.length;
        setAverageRating({
            count:  Object.values(item.ratings).length,
            average
        })
    }


    const handleDeleteItem = () => {
        if (window.confirm("Sure?")) {
            //TODO: MOVE TO API-UTILS
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

    //TODO: MOVE TO API-UTILS
    const saveItem = (_id, _item) => {
        return firebase
            .firestore()
            .collection(ITEM_COLLECTION_NAME)
            .doc(_id)
            .set(_item)
    }

    const handleRatingChange = (event, value) => {
        setUserRating(value);
        if (!item.ratings) {
            item.ratings = {};
        }
        item.ratings[currentUser.email] = value;//TODO: shouldn't this trigger recalculation of  average ?
        setItem({
            ...item
        });
        calculateAverage();
        saveItem(item.id, item)
            .then(() => {
                setHasUserRated(true);
                toast.success("Lagret");
            })
            .catch(() => {
                toast.error("Could not save to server");
            });
    };

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
                    {averageRating.average && (
                        <>
                            <Rating name="simple-controlled" readOnly value={averageRating.average}/>
                            <span>({averageRating.count} vote(s))</span>
                        </>

                    )}
                    {currentUser &&
                    <YourRatingWrapper>
                        {hasUserRated ? <p>Your rating:</p> : <p>Rate this item</p>}
                        <Rating
                            name="simple-controlled"
                            value={userRating}
                            onChange={handleRatingChange}
                        />
                    </YourRatingWrapper>
                    }

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
                </Card>
            </PageContent>
            {/*<pre style={{color: 'white'}}>{JSON.stringify(averageRating, undefined, 2)}</pre>*/}
            <Footer/>
        </>
  );
};

export default ItemListPage;
