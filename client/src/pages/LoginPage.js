import React from "react";
import googleLoginButton from "../resources/btn_google_signin_dark_normal_web.png";

import styled from "styled-components";
const StyledPage = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

function LoginPage() {
  return (
    <StyledPage>
      <a href={`${process.env.REACT_APP_MYTASTE_API_HOST}/auth/google`}>
        <img src={googleLoginButton} alt="Logo" />
      </a>
    </StyledPage>
  );
}

export default LoginPage;
