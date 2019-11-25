import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faTree, faCalendar, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component {
  render() {
    return (
      <div className="nav-menu flex-column">
        {/* <Link to="/singleevent/" className="btn btn-lg btn-outline-danger">
      <div>Random Event</div>
      </Link> */}
        {/* <Link to="/testing/" className="btn btn-lg btn-outline-danger">
        <div>Filter Testing </div>
        </Link> */}
        {/* <Link to="/userlocation/" className="btn btn-lg btn-outline-success">
          <div>User Location</div>
        </Link> */}
        <Link to="/maptesting/" className="button">
          <FontAwesomeIcon icon={faMap} size="lg" />
        </Link>
        {/* <Link to="/parksmap/" className="btn btn-lg btn-outline-warning">
          <div>Map(w/o info)</div>
        </Link>
        <Link to="/eventsmap/" className="btn btn-lg btn-outline-warning">
          <div>Events Map (w/o info)</div>
        </Link> */}
        <Link to="/listevent/" className="">
        <FontAwesomeIcon icon={faCalendar} size="lg"/>
        </Link>
        <Link to="/listpark/" className="">
        <FontAwesomeIcon icon={faTree} size="lg" />
        </Link>
        {/* <Link to="/randompark/" className="btn btn-lg btn-outline-success">
        <div>Random Park</div>
        </Link> */}
        <Link to="/new/" className="">
        <FontAwesomeIcon icon={faCalendarPlus} size="lg" />
        </Link>
      </div>
    );
  }
}
