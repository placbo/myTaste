import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteItem, getItem, updateItem } from '../api/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Rating from '@material-ui/lab/Rating';
import { AuthContext } from '../Auth';
import Chip from '@material-ui/core/Chip';
import CodeIcon from '@material-ui/icons/Code';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.box};
  border-radius: 8px;
  display: flex;
  max-width: 50rem;
  min-width: 20rem;
  width: 80%;
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
  border: 1px solid ${(props) => props.theme.secondary};
  border-radius: 4px;
  padding: 10px;
`;

const RatingLabel = styled.span`
  margin-left: 1rem;
  font-style: italic;
  color: grey;
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

const ItemListPage = ({ match, history }) => {
  const { currentUser, isAdmin } = useContext(AuthContext);
  const [item, setItem] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [hasRatingForCurrentUser, setHasRatingForCurrentUser] = useState(false);
  const [hasUserRated, setHasUserRated] = useState(false);

  useEffect(() => {
    const id = match.params.id; // from the path `/:id`
    if (id) {
      getItem(id)
        .then((result) => {
          setItem(result);
          if (result.ratings && Object.values(result.ratings).length > 0) {
            if (currentUser && result.ratings[currentUser.email]) {
              setUserRating(result.ratings[currentUser.email]);
              setHasRatingForCurrentUser(true);
            }
          }
        })
        .catch((error) => toast.error(error.message));
    }
  }, [match.params.id, currentUser]);

  const handleDeleteItem = () => {
    if (window.confirm('Sure?')) {
      deleteItem(item.id)
        .then(() => {
          toast.success('item deleted');
          history.push('/');
        })
        .catch((error) => toast.error(error.message));
    }
  };

  const handleRatingChange = (event, value) => {
    setUserRating(value);
    setHasUserRated(true);
    if (!item.ratings) {
      item.ratings = {};
    }
    item.ratings[currentUser.email] = value;
    const ratingsArray = Object.values(item.ratings);
    const average = Math.round((ratingsArray.reduce((a, b) => a + b) / ratingsArray.length) * 2) / 2; //rounds to nearest half
    const averageRatingCount = Object.values(item.ratings).length;
    setItem({
      ...item,
      averageRating: average,
      averageRatingCount: averageRatingCount,
    });
  };

  useEffect(() => {
    if (hasUserRated) {
      updateItem(item)
        .then(() => {
          toast.success('Saved');
        })
        .catch(() => {
          toast.error('Could not save to server');
        });
    }
  }, [hasUserRated, item]);

  return (
    <>
      <Header />
      <PageContent>
        <Card>
          <CardHeading>{item.title}</CardHeading>
          {item.image && (
            <ContentLineWrapper>
              <a href={item.image}>
                <ContentImage src={item.image} alt="image" />
              </a>
            </ContentLineWrapper>
          )}
          <ContentLineWrapper>
            <p className="card-text">{item.comment}</p>
          </ContentLineWrapper>

          <ContentLineWrapper>
            {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
              <TagList>
                {item.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    style={{ color: 'white', margin: '0.5rem' }}
                    variant="outlined"
                    color="primary"
                    size="small"
                    label={tag}
                  />
                ))}
              </TagList>
            )}
          </ContentLineWrapper>
          <Rating name="simple-controlled" precision={0.5} readOnly value={+item.averageRating} />
          <RatingLabel>
            {item.averageRatingCount || '0'} {item.averageRatingCount === 1 ? 'vote' : 'votes'}
          </RatingLabel>
          {currentUser && (
            <YourRatingWrapper>
              {hasRatingForCurrentUser ? <p>Your rating:</p> : <p>Rate this item</p>}
              <Rating name="simple-controlled" value={userRating} onChange={handleRatingChange} />
            </YourRatingWrapper>
          )}

          {isAdmin && (
            <CardFooter>
              <Link to={`/item/${item.id}/edit/`}>
                <button className="btn btn-primary">Edit...</button>
              </Link>
              <button className="btn btn-dark" onClick={handleDeleteItem}>
                Delete
              </button>
            </CardFooter>
          )}
        </Card>
      </PageContent>

      <Accordion>
        <AccordionSummary expandIcon={<CodeIcon />} aria-controls="panel-content"></AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(item, undefined, 2)}</pre>
        </AccordionDetails>
      </Accordion>
      <Footer />
    </>
  );
};

export default ItemListPage;
