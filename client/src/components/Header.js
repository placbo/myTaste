import React from "react";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";

const StyledHeader = styled.div`
  height: 60px;
  background-color: ${props => props.theme.box};
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.separator};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Jura", sans-serif;
`;

const IconWrapper = styled.div`
  font-size: 40px;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const Logo = styled.span`
  font-size: 40px;
  font-weight: bold;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const UserAvatar = styled.img`
  height: 40px;
  max-width: 40px;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 50%;
`;

function Header({ user }) {
  return (
    <StyledHeader>
      <Link to="/">
        <IconWrapper>
          <AiFillHome />
        </IconWrapper>
      </Link>
      <Logo>MyTaste</Logo>
      {user ? (
        <>
          <Link to="/profile">
            <UserAvatar src={user.picture} />
          </Link>
        </>
      ) : (
        <Link to="/login">
          <IconWrapper>
            <AiOutlineLogin />
          </IconWrapper>
        </Link>
      )}
    </StyledHeader>
  );
}

export default Header;
