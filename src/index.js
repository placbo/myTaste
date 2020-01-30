import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { interceptRequestsOnMock } from "./api/mockInterceptors";

if (process.env.REACT_APP_USE_MOCK) {
  interceptRequestsOnMock();
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
