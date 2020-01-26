import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${props => props.theme.box};
  width: 100px;
  height: 250px;
  text-align: center;
  margin: 3px;

  :hover {
    background-color: ${props => props.theme.boxHover};
  }
`;

const ItemListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardContent = styled.div`
`;

const DiceValue = styled.img`
    width: 50px;
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
  font-size: 0.8rem;
  font-weight: bold;
  height: 3rem;
`;

function ItemList(props) {
  const CONTENT_BASE_URL = process.env.REACT_APP_MYTASTE_CONTENT_HOST;
  return (
    <ItemListWrapper>
      {props.items.map(item => {
        return (
          <Link key={item._id} to={"/item/" + item._id}>
            <Card>
              <CardHeading>{item.title}</CardHeading>
              <CardContent>
                {item.image && (
                  <ContentImage
                    src={`${CONTENT_BASE_URL}/mytastecontent/thumb/${item.image}`}
                    className="card-img-top"
                    alt="..."
                  />
                )}
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
