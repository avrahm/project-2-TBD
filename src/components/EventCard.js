import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
}

const images = importAll(
  require.context("../images", false, /\.(png|jpe?g|svg)$/)
);
export default class EventCard extends Component {
  deleteEvent = e => {
    let deleteId = e.target.name;
    Axios.delete("https://ironrest.herokuapp.com/avrahm/" + deleteId)
      .then(res => {
        console.log("deleted");

        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="event-card col-12 col-md-5 col-lg-3" key={this.props.key}>
        <Link to={"/singleevent/" + this.props.eachEvent._id}>
          <div
            className="event-card-heading"
            style={{
              backgroundImage:
                "url(" + images[this.props.eachEvent.event.img] + ")"
            }}
          >
          </div>
        </Link>
          <div className="event-card-info">
            <h4 className="title">{this.props.eachEvent.event.title}</h4>
            <div className="row">
              <div className="col-6">
                <p className="date flex-row">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  {this.props.eachEvent.event.date}
                </p>
                <p className="time">
                  <FontAwesomeIcon icon={faClock} />
                  {this.props.eachEvent.event.time}
                </p>
              </div>
              <div className="col-6">
                <h5 className="location-name">
                  {this.props.eachEvent.event.location.name}
                </h5>
              </div>
            </div>

            {/* Date: {this.props.eachEvent[i].date} */}
            {/* <p className="contributor">Phone: {this.props.eachEvent.PHONE}</p> */}
          </div>
        <button
          className="hide"
          name={this.props.eachEvent._id}
          id={this.props.key}
          onClick={this.deleteEvent}
        >
          delete
        </button>
      </div>
    );
  }
}
