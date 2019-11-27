import React from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEx from "./InfoWindowEx";
import { myHistory } from "../index.js";

import eventImg from "../images/league-map.png";
import Loading from "./Loading/Loading";

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

class EventPage extends React.Component {
  state = {
    center: {
      lat: 25.7617,
      lng: -80.1918
    },
    zoom: 10,

    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
  showDetails = () => {
    myHistory.push(this.state.selectedPlaceLink + this.state.selectedPlaceId);
  };
  render() {
    // console.log(this.state.theEvent)
    const style = {
      width: '100%',
      height: '200px'
    }
    if (this.props.listOfEvents) {
      let theEventDetails = this.props.listOfEvents.find(event => {
        return event._id === this.props.match.params.id;
      });
      let theEvent = theEventDetails.event;
      return (
        <div className="event-page">
          <div
            className="container-fluid event-page-heading"
            style={{ backgroundImage: "url(" + images[theEvent.img] + ")" }}
          >
            {/* <img src={images[theEvent.img]} alt={theEvent.title} height="200px" /> */}
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 event-title">
                <h1>{theEvent.title}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-5 event-page-info">
                <h5>Date: {theEvent.date}</h5>
                <h5>Time: {theEvent.time}</h5>
                <hr />
                <h4>Event Organizer</h4>
                <h5>User: {theEvent.user}</h5>
                <hr />
                <h4>About The Event</h4>
                <h5>Sport: {theEvent.sport.toUpperCase()}</h5>
                <p>{theEvent.description}</p>
              </div>
              <div className="col-12 col-md-5 event-page-location">
               <h4>Map</h4>
                <Link to={"/singlepark/" + theEvent.location.id}>
                  <h4>{theEvent.location.name}</h4>
                </Link>
                <p>{theEvent.location.address}</p>
                <Map
                  google={this.props.google}
                  style={style}
                  zoom={this.state.zoom}
                  initialCenter={this.state.center}
                >
                  <Marker
                    onClick={this.onMarkerClick}
                    key={theEvent._id}
                    id={"event"}
                    place_={theEvent}
                    icon={{ url: eventImg }}
                    position={{
                      lat: theEvent.location.lat,
                      lng: theEvent.location.lon
                    }}
                  />
                  <InfoWindowEx
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                  >
                    <div>
                      <h3>{this.state.selectedPlaceName}</h3>
                      <button
                        type="button"
                        onClick={this.showDetails.bind(
                          this,
                          this.state.selectedPlace
                        )}
                      >
                        Show details
                      </button>
                    </div>
                  </InfoWindowEx>
                </Map>
              
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDZiBSkaZztK2mN3Q8QzvzcfPCsDX2_p58"
})(EventPage);
