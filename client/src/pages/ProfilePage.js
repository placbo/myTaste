import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/itemApi";
import { toast } from "react-toastify";
import styled from "styled-components";

const UserAvatar = styled.img`
  height: 100px;
  max-width: 1000px;
  margin: 1rem 0;
  border-radius: 50%;
`;

function ProfilePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserProfile()
      .then(result => setUser(result))
      .catch(error => toast.error(error.message));
  }, []);

  return (
    <>
      {user && (
        <>
          <UserAvatar src={user.picture} />
          <p>{user.name}</p>
          <p>
            <a href="/mytasteapi/logout">Log out</a>
          </p>
        </>
      )}
      <p>App version: {process.env.REACT_APP_VERSION}</p>
    </>
  );
}

export default ProfilePage;
