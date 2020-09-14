import React, {useContext} from "react";
import googleLoginButton from "../resources/btn_google_signin_dark_normal_web.png";
import {AuthContext} from "../Auth.js";
import styled from "styled-components";
import {signInWithGoogle} from "../firebase";
import {Redirect, withRouter} from "react-router";

const StyledPage = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const LoginPage = () => {

    const {currentUser} = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return (
        <StyledPage>
            <div onClick={() => {
                signInWithGoogle();
            }}>
                <img src={googleLoginButton} alt="Logo"/>
            </div>
        </StyledPage>
    );
}

export default withRouter(LoginPage);
