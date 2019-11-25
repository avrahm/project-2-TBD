import React from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

//import images dynamically to the img src value
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

class SingleEvent extends React.Component {
  state = {
    center: {
      lat: 25.7617,
      lng: -80.1918
    },
    zoom: 10
  };

  render() {
    // console.log(this.state.theEvent)

    if (this.props.listOfEvents) {
      let theEventDetails = this.props.listOfEvents.find(event => {
        return event._id === this.props.match.params.id;
      });
      let theEvent = theEventDetails.event;
      return (
        <div className="event-page">
          {/* <Header /> */}
          <div
            className="container-fluid event-heading"
            style={{ backgroundImage: "url(" + images[theEvent.img] + ")" }}
          >
            {/* <img src={images[theEvent.img]} alt={theEvent.title} height="200px" /> */}
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 event-title">
                <h1>Title: {theEvent.title}</h1>
              </div>
              <div className="col-12 col-md-6 event-info">
                <h5>Sport: {theEvent.sport}</h5>
                <h5>Date: {theEvent.date}</h5>
                <h5>Time: {theEvent.time}</h5>
                <h5>User: {theEvent.user}</h5>
                <h4>Description: {theEvent.description}</h4>

                <Link to={"/singlepark/" + theEvent.location.id}>
                  <h3>Location Name: {theEvent.location.name}</h3>
                </Link>
                <p>Location ID: {theEvent.location.id}</p>
                <p>Location Address: {theEvent.location.address}</p>
              </div>
              <div className="col-12 col-md-6 event-location">
                <GoogleMapReact
                  style={{ height: "", width: "250px" }}
                  bootstrapURLKeys={{
                    key: "AIzaSyDZiBSkaZztK2mN3Q8QzvzcfPCsDX2_p58"
                  }}
                  defaultCenter={this.state.center}
                  defaultZoom={this.state.zoom}
                >
                  <Marker
                    lat={theEvent.location.lat}
                    lng={theEvent.location.lon}
                  />
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading....</h1>;
    }
  }
}

export default SingleEvent;
