import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { Router } from 'react-router-dom';
export const myHistory = require("history").createBrowserHistory()


ReactDOM.render(
  <Router history={myHistory}>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
