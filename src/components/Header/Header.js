import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faTree, faCalendar, faCalendarPlus, faSearch } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component {
  render() {
    return (
      <div className="nav-menu d-flex flex-column">
        <Link to="/maptesting/" className="menu-button">
          <FontAwesomeIcon icon={faMap} className="menu-icon" />
          <br />Map
        </Link>
        {/* <Link to="/parksmap/" className="btn btn-lg btn-outline-warning">
          <div>Map(w/o info)</div>
        </Link>
        <Link to="/eventsmap/" className="btn btn-lg btn-outline-warning">
          <div>Events Map (w/o info)</div>
        </Link> */}
        <Link to="/listevent/" className="menu-button">
        <FontAwesomeIcon icon={faCalendar} className="menu-icon" />
        <br />Events
        </Link>
        <Link to="/listpark/" className="menu-button">
        <FontAwesomeIcon icon={faTree} className="menu-icon"  />
        <br /> Parks
        </Link>
        {/* <Link to="/randompark/" className="btn btn-lg btn-outline-success">
        <div>Random Park</div>
        </Link> */}
        <Link to="/new/" className="menu-button">
        <FontAwesomeIcon icon={faCalendarPlus} className="menu-icon"  />
        <br /> Add Event
        </Link>
       
        {/* <Link to="/singleevent/" className="btn btn-lg btn-outline-danger">
      <div>Random Event</div>
      </Link> */}
        {/* <Link to="/testing/" className="btn btn-lg btn-outline-danger">
        <div>Filter Testing </div>
        </Link> */}
        {/* <Link to="/userlocation/" className="btn btn-lg btn-outline-success">
          <div>User Location</div>
        </Link> */}
      </div>
    );
  }
}
