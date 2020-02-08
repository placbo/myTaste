import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {interceptRequestsOnMock, shouldMock} from "./api/mockInterceptors";

if (shouldMock) {
  //interceptRequestsOnMock();
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
