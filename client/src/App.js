import React, { useEffect, useState } from "react";
import ItemListPage from "./pages/ItemListPage";
import { Route, Switch, useHistory } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import ItemPage from "./pages/ItemPage";
import ManageItemPage from "./pages/ManageItemPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
//import queryString from "query-string";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import { getUserProfile } from "./api/api";
import Footer from "./components/Footer";
import SearchPage from "./pages/Search";

const theme = {
  primary: "#e4e6eb",
  Secondary: "#44475a",
  background: "#1c1e21",
  box: "#242526",
  boxHover: "#3b3c3c",
  link: "#e4e6eb",
  separator: "#3d4349",
  primaryText: "#f2f2f2",
  secondaryText: "#8be9fd",
  disabled: "#6272a4",
  danger: "#ff5555"
};

const GlobalStyle = createGlobalStyle`
  HTML, body {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 14px;
    font-family:Helvetica, Arial, sans-serif;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  
  body {
    color: ${props => props.theme.primary};
    background-color: ${props => props.theme.background};
  }
  
  a {
    color : ${props => props.theme.link};
  }
  
  a:hover {
    text-decoration: none;
    color : ${props => props.theme.primary};
  }
 
`;

const StyledContentWrapper = styled.div`
  display: flex;
  margin-top: 60px;
  margin-bottom: 60px;
  flex-direction: column;
`;

function App() {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    // const query = queryString.parse(window.location.search);
    // if (query.token) {
    //   window.localStorage.setItem("jwt", query.token);
    //   history.push("/");
    // }
    getUserProfile()
      .then(result => setUser(result))
      .catch(error => toast.error(error.message));
  }, [history]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header user={user} />
      <StyledContentWrapper>
        <Switch>
          <Route path="/" exact component={ItemListPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/item/:id" exact component={ItemPage} />
          <Route path="/item/:id/edit" exact component={ManageItemPage} />
          <Route path="/new-item" exact component={ManageItemPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </StyledContentWrapper>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
