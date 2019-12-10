import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { HashRouter } from 'react-router-dom';
export const myHistory = require("history").createBrowserHistory()


ReactDOM.render(
  <HashRouter history={myHistory}>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
registerServiceWorker();
