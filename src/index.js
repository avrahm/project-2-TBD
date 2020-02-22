import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { HashRouter } from 'react-router-dom';
export const myHistory = require("history").createHashHistory()


ReactDOM.render(
  <HashRouter history={myHistory} basename={window.location.pathname || ''}>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
registerServiceWorker();
