import React from "react";
import MainPage from "./components/MainPage";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import AboutPage from "./components/AboutPage";
import Header from "./components/Header";
import EditPage from "./components/EditPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/edit" component={EditPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
