import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';
export const myHistory = require("history").createBrowserHistory()


ReactDOM.render(
  <BrowserRouter history={myHistory}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
