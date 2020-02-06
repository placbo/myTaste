import React from "react";
import ItemListPage from "./pages/ItemListPage";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import ItemPage from "./pages/ItemPage";
import ManageItemPage from "./pages/ManageItemPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import LoginPage from "./pages/LoginPage";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer autoClose={3000} hideProgressBar />
      <Switch>
        <Route path="/" exact component={ItemListPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/item/:id" exact component={ItemPage} />
        <Route path="/item/:id/edit" exact component={ManageItemPage} />
        <Route path="/newitem" exact component={ManageItemPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
