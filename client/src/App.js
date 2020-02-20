import React, {useContext, useEffect} from "react";
import ItemListPage from "./pages/ItemListPage";
import {Route, Switch} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import ItemPage from "./pages/ItemPage";
import ManageItemPage from "./pages/ManageItemPage";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, {createGlobalStyle} from "styled-components";
//import queryString from "query-string";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import {getUserProfile} from "./api/api";
import Footer from "./components/Footer";
import SearchPage from "./pages/Search";
import {store, UPDATE_USER_ACTION} from "./store";

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
  margin-top: 80px;
  margin-bottom: 70px;
`;

function App() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    // const query = queryString.parse(window.location.search);
    // if (query.token) {
    //   window.localStorage.setItem("jwt", query.token);
    //   history.push("/");
    // }
    getUserProfile()
      .then(user => {
        dispatch({ type: UPDATE_USER_ACTION, user });
      })
      .catch(error => toast.error(error.message));
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header user={{}} />
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
    </>
  );
}

export default App;
