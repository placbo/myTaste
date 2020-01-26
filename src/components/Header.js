import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 60px;
  background-color:${props => props.theme.box}; ;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.separator}; ;
`;

// const PageTitle = styled.div`
//   font-weight: bold;
//   font-size: 2rem;
// `;

function Header(props) {
  return (
    <Wrapper>
      {/*<PageTitle>{props.title}</PageTitle>*/}
    </Wrapper>
  );
}

export default Header;
