import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/itemApi";
import { toast } from "react-toastify";
import styled from "styled-components";

const UserAvatar = styled.img`
  height: 100px;
  max-width: 100px;
  margin: 2rem 0;
  border-radius: 50%;
`;

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function ProfilePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserProfile()
      .then(result => setUser(result))
      .catch(error => toast.error(error.message));
  }, []);

  return (
    <StyledPage>
      {user && (
        <>
          <UserAvatar src={user.picture} />
          <h3>{user.name}</h3>
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
