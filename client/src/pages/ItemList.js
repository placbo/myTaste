import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
//import Rating from "@material-ui/lab/Rating";

const Card = styled.div`
  background-color: ${(props) => props.theme.box};
  width: 100%;
  max-width: 50rem;
  height: 100px;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  display: flex;
  :hover {
    background-color: ${(props) => props.theme.boxHover};
  }
  //overflow: hidden;
`;

const StyledLink = styled(Link)`
  width: 100%;
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
`;

const CardContent = styled.div`
  flex: 1;
  //min-width: 20rem;
`;

const ImageCol = styled.div`
  width: 150px;
`;

const ContentImage = styled.img`
  width: auto;
  height: auto;
  max-height: 100px;
  max-width: 100px;
  margin: auto;
  padding: 10px;
`;

const CardHeading = styled.div`
  margin-top: 4px;
  font-weight: 600;
  height: 4rem;
`;

const RatingLabel = styled.span`
  margin-left: 1rem;
  font-style: italic;
  color: grey;
`;

const ItemList = (props) => {
  return (
    <>
      {props.items.map((item) => {
        return (
          <StyledLink key={item.id} to={'/item/' + item.id}>
            <Card>
              <ImageCol>
                {item.image && <ContentImage src={item.image} className="card-img-top" alt="image" />}
              </ImageCol>
              <CardContent>
                <CardHeading>{item.title}</CardHeading>
                <Rating name="simple-controlled" precision={0.5} readOnly value={+item.averageRating} />
                <RatingLabel>
                  {item.averageRatingCount || '0'} {item.averageRatingCount === 1 ? 'vote' : 'votes'}
                </RatingLabel>
              </CardContent>
            </Card>
          </StyledLink>
        );
      })}
    </>
  );
};

export default ItemList;
