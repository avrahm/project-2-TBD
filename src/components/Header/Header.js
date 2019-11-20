import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {

  render() {
   

    return (
      <div className={"container"}>
      {/* <Link to="/singleevent/" className="btn btn-lg btn-outline-danger">
      <h3>Random Event</h3>
      </Link><br /> */}
        <Link to="/map/" className="btn btn-lg btn-outline-danger">
        <h3>Locations on the Map</h3>
        </Link><br />
        <Link to="/listevent/" className="btn btn-lg btn-outline-success">
        <h3>List of Events</h3>
        </Link><br />
        <Link to="/listpark/" className="btn btn-lg btn-outline-success">
        <h3>List of Parks</h3>
        </Link><br />
        {/* <Link to="/randompark/" className="btn btn-lg btn-outline-success">
        <h3>Random Park</h3>
        </Link><br /> */}
        <Link to="/new/" className="btn btn-lg btn-outline-success">
        <h3>Add a Event</h3>
        </Link><br />
      </div>
    );
  }
}
