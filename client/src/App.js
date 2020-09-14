import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import ItemListPage from "./pages/ItemListPage";
import LoginPage from "./pages/LoginPage";
import ItemPage from "./pages/ItemPage";
import ManageItemPage from "./pages/ManageItemPage";
import SearchPage from "./pages/Search";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, {createGlobalStyle} from "styled-components";
import {AuthProvider} from "./Auth";

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

const App = () => {
    return (
        <>
            <GlobalStyle/>
            <ToastContainer autoClose={3000} hideProgressBar/>
            <StyledContentWrapper>
                <AuthProvider>
                    <Router>
                        <PrivateRoute exact path="/profile" component={ProfilePage}/>
                        <Route exact path="/" component={ItemListPage}/>
                        <Route exact path="/search" component={SearchPage}/>
                        <Route exact path="/item/:id" component={ItemPage}/>
                        <Route exact path="/item/:id/edit" component={ManageItemPage}/>
                        <Route exact path="/new-item" component={ManageItemPage}/>
                        <Route exact path="/login" component={LoginPage}/>
                    </Router>
                </AuthProvider>
            </StyledContentWrapper>
        </>
    );
}

export default App;
