import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div className="navbar fixed-bottom navbar-light bg-light flex-row ">
        {/* <Link to="/singleevent/" className="btn btn-lg btn-outline-danger">
      <div>Random Event</div>
      </Link> */}
        {/* <Link to="/testing/" className="btn btn-lg btn-outline-danger">
        <div>Filter Testing </div>
        </Link> */}
        {/* <Link to="/userlocation/" className="btn btn-lg btn-outline-success">
          <div>User Location</div>
        </Link> */}
        <Link to="/maptest/" className="btn btn-lg btn-outline-danger">
          <div>Map Test</div>
        </Link>
        <Link to="/map/" className="btn btn-lg btn-outline-warning">
          <div>Map(w/o info)</div>
        </Link>
        <Link to="/mapevents/" className="btn btn-lg btn-outline-warning">
          <div>Events Map (w/o info)</div>
        </Link>
        <Link to="/listevent/" className="btn btn-lg btn-outline-success">
          <div>List of Events</div>
        </Link>
        <Link to="/listpark/" className="btn btn-lg btn-outline-success">
          <div>List of Parks</div>
        </Link>
        {/* <Link to="/randompark/" className="btn btn-lg btn-outline-success">
        <div>Random Park</div>
        </Link> */}
        <Link to="/new/" className="btn btn-lg btn-outline-success">
          <div>Add a Event</div>
        </Link>
      </div>
    );
  }
}
