import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import UserMarker from "./UserMarker";
// import MarkerCluster from '@google/markerclusterer'
import Loading from "./Loading/loading";

export default class Map extends Component {
  state = {
    center: {
      lat: 25.7617,
      lng: -80.1918
    },
    zoom: 10,
    message: "",
    status: "",
    userLocation: {
      latitude: 0,
      longitude: 0
    }
  };

  getLocation = () => {
    // console.log("get location");
    let geo_success = position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
      });
    };

    let geo_error = () => {
      console.log("Sorry, no position available.");
    };

    let geo_options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 7000
    };

    navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
  };
  showParks = () => {
    return this.props.listOfParks.map((eachPark, i) => {
      return (
        <Marker
          key={i}
          lat={eachPark.event.location.lat}
          lng={eachPark.event.location.lon}
          text="My Marker"
        />
      );
    });
  };

  render() {
    if (this.props.listOfParks)
      return (
        <div>
          <h1>{this.state.message}</h1>
          <GoogleMapReact
            style={{ height: "80vh", width: "100%" }}
            bootstrapURLKeys={{
              key: "AIzaSyDZiBSkaZztK2mN3Q8QzvzcfPCsDX2_p58"
            }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            {this.showParks()}
            <UserMarker
              lat={this.state.userLocation.latitude}
              lng={this.state.userLocation.longitude}
            />
          </GoogleMapReact>
          
          <div className="menu">
            <h1>Filter</h1>
            <button
              onClick={this.getLocation}
            >
              Get Location
            </button>
            <br />
            Basketball:
            <input
              type="checkbox"
              name="basketball"
              onClick={this.props.parkFilterFunction}
            />
            <br />
            Soccer:{" "}
            <input
              type="checkbox"
              name="soccer"
              onClick={this.props.parkFilterFunction}
            />
            <br />
            Baseball{" "}
            <input
              type="checkbox"
              name="baseball"
              onClick={this.props.parkFilterFunction}
            />
            <br />
            Volleyball:
            <input
              type="checkbox"
              name="volleyball"
              onClick={this.props.parkFilterFunction}
            />
          </div>
        </div>
      );
    else return <Loading />;
  }
}
