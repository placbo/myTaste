import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useHistory } from 'react-router';
import app from 'firebase';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../Auth';
import { toast } from 'react-toastify';

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

const Divider = styled.div`
  width: 80%;
  border-top: 1px solid ${(props) => props.theme.separator};
  margin: 2rem 0 2rem 0;
`;

const ProfilePage = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const signOut = () => {
    app
      .auth()
      .signOut()
      .then(() => history.push('/'))
      .catch(() => toast.error('Could not log out'));
  };

  return (
    <>
      <Header />
      <StyledPage>
        <UserAvatar src={currentUser.photoURL} />
        <h3>{currentUser.displayName}</h3>
        <Divider />
        <Button variant="contained" onClick={signOut}>
          Log out
        </Button>
        {/*<p>App version: {process.env.REACT_APP_VERSION}</p>*/}
      </StyledPage>
      <Footer />
    </>
  );
};

export default ProfilePage;
