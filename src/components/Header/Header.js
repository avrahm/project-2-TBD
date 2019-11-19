import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {

  render() {
   

    return (
      <div className={"container"}>
      <Link to="/singleevent/">
      <h3>Single Event</h3>
      </Link>
        <Link to="/listpark/">
        <h3>List of Parks</h3>
        </Link>
        <Link to="/randompark/">
        <h3>Random Park</h3>
        </Link>
        <Link to="/new/">
        <h3>Add a Event</h3>
        </Link>
      </div>
    );
  }
}
