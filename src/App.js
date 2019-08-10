import React from "react";
import ItemListPage from "./components/ItemListPage";
import {Route, Switch} from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import AboutPage from "./components/AboutPage";
import Header from "./components/Header";
import ItemPage from "./components/ItemPage";
import ManageItemPage from "./components/ManageItemPage";

function App() {
    return (
        <div className="container-fluid">
            <Header/>
            <Switch>
                <Route path="/" exact component={ItemListPage}/>
                <Route path="/about" component={AboutPage}/>
                <Route path="/item/:id" exact component={ItemPage}/>
                <Route path="/item/:id/edit" exact component={ManageItemPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    );
}

export default App;
