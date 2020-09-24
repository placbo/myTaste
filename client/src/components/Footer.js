import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai';
import { AuthContext } from '../Auth';

const StyledFooter = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 70px;
  background-color: ${(props) => props.theme.separator};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-family: 'Jura', sans-serif;
`;

const IconWrapper = styled.div`
  font-size: 32px;
  margin-left: 1rem;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  height: 100%;
`;
const IconLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  margin-top: 6px;
`;

const Footer = () => {
  const { isAdmin } = useContext(AuthContext);

  return (
    <StyledFooter>
      <Link to="/">
        <IconWrapper>
          <AiOutlineHome />
          <IconLabel>Home</IconLabel>
        </IconWrapper>
      </Link>
      <Link to="/search">
        <IconWrapper>
          <AiOutlineSearch />
          <IconLabel>Search</IconLabel>
        </IconWrapper>
      </Link>
      {isAdmin && (
        <Link to="/new-item">
          <IconWrapper>
            <AiOutlinePlusCircle />
            <IconLabel>New</IconLabel>
          </IconWrapper>
        </Link>
      )}
    </StyledFooter>
  );
};

export default Footer;
