import React, { useContext } from "react";
import styled from "styled-components";
import { store } from "../store";

const UserAvatar = styled.img`
  height: 200px;
  max-width: 200px;
  margin: 2rem 0;
  border-radius: 50%;
`;

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

function ProfilePage() {
  const state = useContext(store);

  return (
    <StyledPage>
      {state.state && (
        <>
          <UserAvatar src={state.state?.picture} />
          <h3>{state.state?.name}</h3>
          <hr />
          <p>
            <a href="/mytasteapi/logout">Log out</a>
          </p>
        </>
      )}
      <p>App version: {process.env.REACT_APP_VERSION}</p>
    </StyledPage>
  );
}

export default ProfilePage;
