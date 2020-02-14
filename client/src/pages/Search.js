import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const StyledPage = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;
function SearchPage() {
  return (
    <StyledPage>
      <h2>Not implemented :-(</h2>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </StyledPage>
  );
}

export default SearchPage;
