import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const ItemListWrapper = styled.div`
  flex-direction: column;
  display: flex;
`;

const Card = styled.div`
  background-color: ${props => props.theme.box};
  width: 100%;
  height: 100px;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  display: flex;
  :hover {
    background-color: ${props => props.theme.boxHover};
  }
  overflow: hidden;
`;

const CardContent = styled.div`
  flex: 1;
  min-width: 20rem;
`;

const DiceValue = styled.img`
  width: 20px;
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

function ItemList(props) {
  const CONTENT_BASE_URL = process.env.REACT_APP_MYTASTE_CONTENT_HOST;
  return (
    <ItemListWrapper>
      {props.items.map(item => {
        return (
          <Link key={item._id} to={"/item/" + item._id}>
            <Card>
              <ImageCol>
                {item.image && (
                  <ContentImage
                    src={`${CONTENT_BASE_URL}/thumb/${item.image}`}
                    className="card-img-top"
                    alt="..."
                  />
                )}
              </ImageCol>
              <CardContent>
                <CardHeading>{item.title}</CardHeading>
                {item.diceValue && (
                  <DiceValue
                    className="diceValue"
                    src={`/img/dice_${item.diceValue}.png`}
                    alt={item.diceValue}
                  />
                )}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </ItemListWrapper>
  );
}

export default ItemList;
