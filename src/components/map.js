import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

export default class map extends Component {
  state = {
    center: {
      lat: 25.7617,
      lng: -80.1918
    },
    zoom: 10
  };
  showParks = () => {
      return this.props.listOfParks.map((eachPark, i) => {
          return (
              <Marker
                key={i}
                lat={eachPark.attributes.LAT}
                lng={eachPark.attributes.LON}
                text="My Marker"
              />
            );
          });
        };
        render() {
          if(this.props.listOfParks)
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAo0k6gwGtQ8IT0b0tw1u8XPEGlxSEulHw" }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {this.showParks()}
        </GoogleMapReact>
      </div>
    );else return <div>loading...</div>;
  } 
}
